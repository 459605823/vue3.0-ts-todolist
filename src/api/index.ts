import ky from 'ky';
import { ElMessage } from 'element-plus';
const serverPort = 3000;
const api = ky.create({
  prefixUrl: `//${window.location.hostname}:${serverPort}/api`,
  headers: {
    Authorization: localStorage.getItem('JWT_TOKEN') ?? '',
  },
  retry: 0,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 400) {
          const json = await response.json();
          ElMessage.error(json.data);
        } else if (response.status === 500) {
          ElMessage.error('服务器错误');
        } else if (response.status === 401) {
          window.location.href = '/login';
        }
      },
    ],
  },
});

export default api;
