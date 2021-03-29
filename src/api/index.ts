import ky from 'ky';
import { ElMessage } from 'element-plus';
const serverPort = 3000;
type methods = 'get' | 'post' | 'put' | 'delete';
const api = ky.create({
  prefixUrl: `//${window.location.hostname}:${serverPort}/api`,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 400) {
          const json = await response.json();
          ElMessage.error(json.data);
        } else if (response.status === 500) {
          ElMessage.error('服务器错误');
        }
      },
    ],
  },
});

export default api;
