<template>
  <div class="todo-list">
    <todo-list-item
      v-for="todo in todos"
      :key="todo.id"
      @change-state="handleStateChange(todo, $event.target.checked)"
      :todo-item="todo"
    ></todo-list-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { todo } from "@/types";
import {updateTodo} from "@/api/todos";
import TodoListItem from "./TodoListItem.vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "TodoList",
  components: {
    TodoListItem,
  },
  props: {
    todos: {
      type: Array as PropType<todo[]>,
      required: true,
    },
  },
  methods: {
    async handleStateChange(todo: todo, checked: boolean) {
      const {err} = await updateTodo(todo.id, checked);
      if (!err) {
        todo.completed = checked;
      } else {
        ElMessage.error("修改todo失败");
      }
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
