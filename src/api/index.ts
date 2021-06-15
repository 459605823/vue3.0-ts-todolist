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
    } else {
      if (response.status === 400) {
        const json = await response.json();
        ElMessage.error(json.data);
      } else if (response.status === 500) {
        ElMessage.error('服务器错误');
      } else if (response.status === 401) {
        Router.replace({path: '/login'});
      }
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

const apiFn = (method: Method) => {
  function fn(url: Input, options?: Options): Promise<{err?: any; res?: any}>;
  function fn<T extends object>(
    url: Input,
    options?: Options
  ): Promise<{err?: any; res?: T}>;
  async function fn(url: Input, options: Options = {}) {
    const {err, res} = await to(_ky(url, {...options, method}));
    if (!err) {
      const payload = await res.json();
      return {
        res: payload,
      };
    }
    return {err};
  }
  return fn;
};

const get = apiFn('get');

type Api = Record<Method, typeof get>;
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
  api[method] = apiFn(method);
});

export default api;
