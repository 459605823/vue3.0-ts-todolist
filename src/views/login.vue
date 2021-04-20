<template>
  <div class="container mx-auto">
    <h1 class="text-2xl mb-5">{{ type === "login" ? "登录" : "注册" }}</h1>
    <div class="form-item">
      <label for="username" class="form-item--label">用户名：</label>
      <input
        v-model="username"
        type="text"
        id="username"
        class="form-item--input"
      />
    </div>
    <div class="form-item">
      <label for="password" class="form-item--label">密 码：</label>
      <input
        v-model="password"
        type="password"
        id="password"
        class="form-item--input"
      />
    </div>
    <button @click="handleUser('login')" v-if="type === 'login'" class="btn">
      登录
    </button>
    <button
      @click="handleUser('register')"
      v-if="type === 'register'"
      class="btn"
    >
      注册
    </button>
    <div
      class="form-footer flex justify-between content-center text-sm border-t border-gray-300 bg-gray-100 pt-2"
      v-if="type === 'login'"
    >
      <div
        @click="githubLogin"
        class="w-10 h-10 rounded bg-github bg-cover cursor-pointer"
      ></div>
      <p
        @click="type = 'register'"
        class="text-gray-600 leading-10 cursor-pointer"
      >
        没有账号? 去注册
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import api from "@/api";
import { response } from "@/types";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "Login",
  setup() {
    const username = ref<string>("");
    const password = ref<string>("");
    const type = ref<string>("login");
    const handleUser = async (path: string) => {
      const res = await api
        .post(path, {
          json: { username: username.value, password: password.value },
        })
        .json<response>();
      if (res.errno) {
        const token = res.data;
        localStorage.setItem("JWT_TOKEN", token);
        // 本地token改变时要强制刷新页面，重新创建api获取新的token
        window.location.href = "/";
      } else {
        ElMessage.error(res.data);
      }
    };
    return {
      username,
      password,
      handleUser,
      type,
    };
  },
  methods: {
    githubLogin() {
      const client_id = "7cb56203f4b43e7aea70";
      const authorize_uri = "https://github.com/login/oauth/authorize";
      const redirect_uri = "http://localhost:8080/auth/redirect";
      window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
    },
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