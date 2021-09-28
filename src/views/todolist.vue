<template>
  <main>
    <div class="container">
      <h1 class="text-2xl mb-5">欢迎 {{ user.username }} 使用待办事项</h1>
      <todo-add :tid="todos.length" @add-todo="addTodo" />
      <todo-filter :selected="filter" @change-filter="changeFilter" />
      <todo-list :todos="filteredTodos" />
      <p class="text-gray-500 cursor-pointer mt-5" @click="logout">登出</p>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, shallowRef} from 'vue';
import TodoAdd from '@/components/TodoAdd.vue';
import TodoFilter from '@/components/TodoFilter.vue';
import TodoList from '@/components/TodoList.vue';
import useTodos from '@/composables/useTodos';
import useFilteredTodos from '@/composables/useFilteredTodos';
import {MutationTypes} from '@/store/mutation-types';
import {useStore} from '@/store';

export default defineComponent({
  name: 'Todolist',
  components: {
    TodoAdd,
    TodoFilter,
    TodoList,
  },
  setup() {
    const filter = ref<string>('all');
    const {todos, addTodo} = useTodos();
    const {filteredTodos} = useFilteredTodos(filter);
    const user = shallowRef({});
    const store = useStore();
    const changeFilter = (e: string) => {
      filter.value = e;
    };
    const logout = () => {
      localStorage.removeItem('USER_DATA');
      store.commit(MutationTypes.SET_USER, {});
      window.location.href = '/login';
    };
    onMounted(() => {
      user.value = store.state.user.username
        ? store.state.user
        : JSON.parse(localStorage.getItem('USER_DATA') as string);
    });
    return {
      todos,
      filter,
      addTodo,
      changeFilter,
      logout,
      filteredTodos,
      user,
    };
  },
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Helvetica, 'PingFang SC', 'Microsoft Yahei', sans-serif;
}

/* 整个页面 */
main {
  width: 100vw;
  min-height: 100vh;
  padding: 10vh 0;
  display: grid;
  align-items: start;
  justify-items: center;
  background: rgb(203, 210, 240);
}

.container {
  width: 60%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  padding: 48px 28px;
  background-color: rgb(245, 246, 252);
}

/* 标题 */
h1 {
  margin: 24px 0;
  font-size: 28px;
  color: #414873;
}
</style>
