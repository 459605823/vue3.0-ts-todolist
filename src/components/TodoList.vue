<template>
  <div class="todo-list">
    <todo-list-item
      v-for="todo in todos"
      :key="todo.id"
      @change-state="todo.completed = $event.target.checked"
      :todo-item="todo"
    ></todo-list-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Todo } from "@/types";
import TodoListItem from "./TodoListItem.vue";

export default defineComponent({
  name: "TodoList",
  components: {
    TodoListItem,
  },
  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true,
    },
  },
});
</script>

<style>
.todo-list {
  display: grid;
  row-gap: 14px;
}
</style>
