import ky, {AfterResponseHook, BeforeRequestHook, Input, Options} from 'ky';
import {ElMessage} from 'element-plus';
import Router from '@/router';
import {store} from '@/store';

const serverPort = 3000;

const afterResponse: AfterResponseHook[] = [
  async (request, options, response) => {
    if (response.ok) {
      const payload = await response.json();
      if (!payload.errno) {
        ElMessage.error(payload.data);
      } else {
        return new Response(JSON.stringify(payload.data), {status: 200});
      }
    } else if (response.status === 400) {
      const json = await response.json();
      ElMessage.error(json.data);
    } else if (response.status === 500) {
      ElMessage.error('服务器错误');
    } else if (response.status === 401) {
      Router.replace({path: '/login'});
    }
  },
];

const beforeRequest: BeforeRequestHook[] = [
  request => {
    if (store.state.user.token || localStorage.getItem('USER_DATA')) {
      request.headers.set(
        'Authorization',
        `${store.state.user.token ||
          JSON.parse(localStorage.getItem('USER_DATA') as string).token}`
      );
    }
  },
];

const _ky = ky.create({
  prefixUrl: `//${window.location.hostname}:${serverPort}/api`,
  retry: 0,
  // credentials: 'include',
  cache: 'no-store',
  mode: 'cors',
  hooks: {
    beforeRequest,
    afterResponse,
  },
});

const to = (promise: Promise<any>) =>
  promise
    .then(res => ({
      err: null,
      res,
    }))
    .catch(err => ({err, res: undefined}));

type Method = Exclude<Options['method'], undefined | object>;
interface Action {
  (url: Input, options?: Options): Promise<{
    err?: any;
    res?: any;
  }>;
}

type Api = Record<Method, Action>;
const api = Object.create(null) as Api;
const requestMethods: Method[] = [
  'get',
  'post',
  'put',
  'patch',
  'head',
  'delete',
];

requestMethods.forEach(method => {
  api[method] = async (url, options) => {
    const {err, res} = await to(_ky[method](url, options));
    if (!err) {
      const payload = await res.json();
      return {
        res: payload,
      };
    }
    return {err};
  };
});

export default api;
