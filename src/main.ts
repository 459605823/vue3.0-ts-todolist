import { createApp } from 'vue';
import 'element-plus/packages/theme-chalk/src/base.scss';
import { ElMessage } from 'element-plus';

import App from './App.vue';
import router from './router';
import { store, key } from './store';
import './styles/index.css';

createApp(App)
  .use(store, key)
  .use(router)
  .use(ElMessage)
  .mount('#app');
