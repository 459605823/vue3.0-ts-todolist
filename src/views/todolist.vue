<template>
  <main>
    <div class="container">
      <h1 class="text-2xl mb-5">欢迎 {{ user.username }} 使用待办事项</h1>
      <todo-add :tid="todos.length" @add-todo="addTodo" />
      <todo-filter :selected="filter" @change-filter="changeFilter" />
      <todo-list :todos="filteredTodos" />
      <p @click="logout" class="text-gray-500 cursor-pointer mt-5">登出</p>
    </div>
  </main>
</template>

<script lang="ts">
import TodoAdd from "@/components/TodoAdd.vue";
import TodoFilter from "@/components/TodoFilter.vue";
import TodoList from "@/components/TodoList.vue";
import useTodos from "@/composables/useTodos";
import useFilteredTodos from "@/composables/useFilteredTodos";
import api from "@/api";
import { defineComponent, ref, reactive } from "vue";
import { response } from "@/types";
import { MutationTypes } from "@/store/mutation-types";

export default defineComponent({
  name: "Todolist",
  components: {
    TodoAdd,
    TodoFilter,
    TodoList,
  },
  setup() {
    const filter = ref<string>("all");
    const { todos, addTodo } = useTodos();
    const { filteredTodos } = useFilteredTodos(filter);
    const user = reactive({});
    return {
      todos,
      filter,
      addTodo,
      filteredTodos,
      user,
    };
  },
  async mounted() {
    const res = await api.get("user").json<response>();
    this.user = res.data;
    this.$store.commit(MutationTypes.CHANGE_USER, this.user);
  },
  methods: {
    changeFilter(e: string) {
      this.filter = e;
    },
    logout() {
      localStorage.removeItem("JWT_TOKEN");
      window.location.href = "/login";
    },
  },
});
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Helvetica, "PingFang SC", "Microsoft Yahei", sans-serif;
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
