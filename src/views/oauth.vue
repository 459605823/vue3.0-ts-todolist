<template>
  <div>第三方登录中.....</div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {oauth} from '@/api/users';
import {useStore} from '@/store';
import {MutationTypes} from '@/store/mutation-types';
import Router from '@/router';
export default defineComponent({
  name: 'oauth',
  setup: () => {
    onMounted(async () => {
      const route = useRoute();
      const code = route.query.code;
      const store = useStore();
      const {err, res} = await oauth(code);
      if (!err) {
        localStorage.setItem('JWT_TOKEN', JSON.stringify(res));
        store.commit(MutationTypes.SET_USER, res);
        Router.replace({path: '/'});
      } else {
        window.location.href = '/login';
      }
    });
  },
});
</script>

<style lang="" scoped></style>
