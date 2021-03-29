<template>
  <div class="todo-list">
    <todo-list-item
      v-for="todo in todos"
      :key="todo._id"
      @change-state="handleStateChange(todo, $event.target.checked)"
      :todo-item="todo"
    ></todo-list-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { todo, response } from "@/types";
import api from "@/api";
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
      const res = await api
        .put("todo/" + todo.id, { json: { completed: checked } })
        .json<response>();
      if (res.errno) {
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
