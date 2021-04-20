<template>
  <main>
    <div class="container mx-auto px-10">
      <h1>{{ type === "login" ? "登录" : "注册" }}</h1>
      <div class="form-item">
        <label for="username">用户名：</label>
        <input
          v-model="username"
          type="text"
          id="username"
          class="rounded border-solid border"
        />
      </div>
      <div class="form-item">
        <label for="password">密 码：</label>
        <input v-model="password" type="password" id="password" />
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
      <p @click="type = 'register'" class="info">没有账号? 去注册</p>
      <div>
        <span @click="githubLogin">github</span>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import api from "@/api";
import { response } from "@/types";
import { useStore } from "@/store";
import { MutationTypes } from "@/store/mutation-types";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "Login",
  setup() {
    const username = ref<string>("");
    const password = ref<string>("");
    const type = ref<string>("login");
    const store = useStore();
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
.info {
  font-size: 12px;
  color: #aaa;
  cursor: pointer;
}

.form-item {
  @apply space-x-4 mt-4;
}

.btn {
  @apply py-2 px-4 my-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75;
}
</style>