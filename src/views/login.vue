<template>
  <div class="container mx-auto">
    <h1 class="text-2xl mb-5">{{ type === 'login' ? '登录' : '注册' }}</h1>
    <div class="form-item">
      <label for="username" class="form-item--label">用户名：</label>
      <input
        id="username"
        v-model="username"
        type="text"
        class="form-item--input"
      />
    </div>
    <div class="form-item">
      <label for="password" class="form-item--label">密 码：</label>
      <input
        id="password"
        v-model="password"
        type="password"
        class="form-item--input"
      />
    </div>
    <button v-if="type === 'login'" class="btn" @click="handleUser('login')">
      登录
    </button>
    <button
      v-if="type === 'register'"
      class="btn"
      @click="handleUser('register')"
    >
      注册
    </button>
    <div
      v-if="type === 'login'"
      class="form-footer flex justify-between content-center text-sm border-t border-gray-300 bg-gray-100 pt-2"
    >
      <div
        class="w-10 h-10 rounded bg-github bg-cover cursor-pointer"
        @click="githubLogin"
      ></div>
      <p
        class="text-gray-600 leading-10 cursor-pointer"
        @click="type = 'register'"
      >
        没有账号? 去注册
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useStore} from '@/store';
import {MutationTypes} from '@/store/mutation-types';
import Router from '@/router';
import {login, register} from '@/api/users';

export default defineComponent({
  name: 'Login',
  setup() {
    const username = ref<string>('');
    const password = ref<string>('');
    const type = ref<string>('login');
    const store = useStore();
    const handleUser = async (path: string) => {
      const apiFn = path === 'login' ? login : register;
      const {err, res} = await apiFn(username.value, password.value);
      if (!err) {
        localStorage.setItem('USER_DATA', JSON.stringify(res));
        store.commit(MutationTypes.SET_USER, res);
        Router.replace({path: '/'});
      }
    };
    const githubLogin = () => {
      const client_id = '7cb56203f4b43e7aea70';
      const authorize_uri = 'https://github.com/login/oauth/authorize';
      const redirect_uri = 'http://localhost:8080/auth/redirect';
      window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
    };
    return {
      username,
      password,
      handleUser,
      type,
      githubLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-item {
  @apply mt-5;
  &--label {
    @apply block mb-2 text-sm font-medium text-gray-600 text-left;
  }
  &--input {
    @apply block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none;
  }
}

.btn {
  @apply py-2 px-4 my-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75;
}
</style>
