<template>
  <main>
    <div class="container">
      <h1>欢迎使用待办事项</h1>
      <todo-add :tid="todos.length" @add-todo="addTodo" />
      <todo-filter :selected="filter" @change-filter="changeFilter" />
      <todo-list :todos="filteredTodos" />
    </div>
  </main>
</template>

<script lang="ts">
import TodoAdd from "@/components/TodoAdd.vue";
import TodoFilter from "@/components/TodoFilter.vue";
import TodoList from "@/components/TodoList.vue";
import useTodos from "@/composables/useTodos";
import useFilteredTodos from "@/composables/useFilteredTodos";
import { getCurrentInstance, defineComponent, isRef, ref } from "vue";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    TodoAdd,
    TodoFilter,
    TodoList,
  },
  setup() {
    console.log(getCurrentInstance());
    console.log(useRouter());
    console.log(useRoute());
    const store = useStore();
    const filter = ref<string>("all");
    console.log(store.state.author);
    const { todos, addTodo } = useTodos();
    const { filteredTodos } = useFilteredTodos(filter);
    console.log(isRef(filter));
    return {
      todos,
      filter,
      addTodo,
      filteredTodos,
    };
  },
  methods: {
    changeFilter(e: string) {
      console.log(isRef(this.filter));
      this.filter = e;
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
