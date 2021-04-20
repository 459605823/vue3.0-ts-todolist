<template>
  <div>第三方登录中.....</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import api from "@/api";
import { response } from "@/types";
export default defineComponent({
  name: "oauth",
  setup: () => {
    onMounted(async () => {
      const route = useRoute();
      const code = route.query.code;
      const res = await api.get("auth/redirect?code=" + code).json<response>();
      if (res.errno) {
        const { token } = res.data;
        localStorage.setItem("JWT_TOKEN", token);
        // 本地token改变时要强制刷新页面，重新创建api获取新的token
        window.location.href = "/";
      } else {
        ElMessage.error(res.data);
        window.location.href = "/login";
      }
    });
  },
});
</script>

<style lang="" scoped>
</style>