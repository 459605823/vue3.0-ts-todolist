<template>
  <div class="todo-item" :class="{ done: todoItem.completed }">
    <label>
      <input
        type="checkbox"
        :checked="todoItem.completed"
        @click="$emit('change-state', $event)"
      />
      {{ todoItem.content }}
      <span class="check-button"></span>
      <i
        class="el-icon-close"
        @click.capture.prevent="handleDelete(todoItem.id)"
      ></i>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { todo, response } from "@/types";
import api from "@/api";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/action-types";

export default defineComponent({
  name: "TodoListItem",
  emits: ["change-state"],
  props: {
    todoItem: {
      type: Object as PropType<todo>,
      required: true,
    },
  },
  methods: {
    async handleDelete(id: string) {
      const res = await api.delete("todo/" + id).json<response>();
      // const store = useStore();
      // store.dispatch(ActionTypes.FETCH_TODOS);
    },
  },
});
</script>

<style>
.todo-item {
  background: white;
  padding: 16px;
  border-radius: 8px;
  color: #626262;
}

.todo-item label {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.todo-item.done label {
  text-decoration: line-through;
  font-style: italic;
}

.todo-item label span.check-button {
  position: absolute;
  top: 0;
}

.todo-item label span.check-button::before,
.todo-item label span.check-button::after {
  content: "";
  display: block;
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.todo-item label span.check-button::before {
  border: 1px solid #b382f9;
}

.todo-item label span.check-button::after {
  transition: 0.4s;
  background: #b382f9;
  transform: translate(1px, 1px) scale(0.8);
  opacity: 0;
}

.todo-item input {
  margin-right: 16px;
  opacity: 0;
}

.todo-item input:checked + span.check-button::after {
  opacity: 1;
}

.todo-item label i {
  display: block;
  position: absolute;
  right: 0;
  z-index: 2;
}
</style>
