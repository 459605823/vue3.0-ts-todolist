<template>
  <main>
    <div class="container">
      <h1>{{ type === "login" ? "登录" : "注册" }}</h1>
      <div class="form-item">
        <label for="username">用户名</label>
        <input v-model="username" type="text" id="username" />
      </div>
      <div class="form-item">
        <label for="password">密码</label>
        <input v-model="password" type="password" id="password" />
      </div>
      <button
        @click="handleUser('login')"
        v-if="type === 'login'"
        class="login-btn"
      >
        登录
      </button>
      <button
        @click="handleUser('register')"
        v-if="type === 'register'"
        class="register-btn"
      >
        注册
      </button>
      <p @click="type = 'register'" class="info">没有账号? 去注册</p>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import api from "@/api";
import { response } from "@/types";
import { useStore } from "@/store";
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
        store.state.user = {
          username: username.value,
          password: password.value,
        };
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
});
</script>

<style lang="scss" scoped>
.info {
  font-size: 12px;
  color: #aaa;
  cursor: pointer;
}
</style>