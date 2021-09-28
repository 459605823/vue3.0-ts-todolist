<template>
  <div class="todo-item" :class="{done: todoItem.completed}">
    <label>
      <input
        type="checkbox"
        :checked="todoItem.completed"
        @click="$emit('change-state', $event)"
      />
      {{ todoItem.content }}
      <span class="check-button"></span>
    </label>
    <i class="el-icon-close" @click="handleDelete(todoItem.id)"></i>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {ElMessage} from 'element-plus';
import {todo} from '@/types';
import {deleteTodo} from '@/api/todos';
import {ActionTypes} from '@/store/action-types';

export default defineComponent({
  name: 'TodoListItem',
  props: {
    todoItem: {
      type: Object as PropType<todo>,
      required: true,
    },
  },
  emits: ['change-state'],
  methods: {
    async handleDelete(id: string) {
      if (id) {
        const {err} = await deleteTodo(id);
        if (!err) {
          ElMessage.success('删除todo成功');
          this.$store.dispatch(ActionTypes.FETCH_TODOS);
        } else {
          ElMessage.error('删除todo失败');
        }
      }
    },
  },
});
</script>

<style>
.todo-item {
  position: relative;
  background: white;
  padding: 16px;
  border-radius: 8px;
  color: #626262;
  display: flex;
  align-items: center;
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
  content: '';
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

.todo-item i {
  cursor: pointer;
  display: block;
  position: absolute;
  right: 10px;
}
</style>
