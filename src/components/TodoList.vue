<template>
  <div class="todo-list">
    <todo-list-item
      v-for="todo in todos"
      :key="todo.id"
      :todo-item="todo"
      @change-state="handleStateChange(todo, $event.target.checked)"
    ></todo-list-item>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {ElMessage} from 'element-plus';
import {todo as Todo} from '@/types';
import {updateTodo} from '@/api/todos';
import TodoListItem from './TodoListItem.vue';

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoListItem,
  },
  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true,
    },
  },
  setup() {
    const handleStateChange = async (todo: Todo, checked: boolean) => {
      const {err} = await updateTodo(todo.id, checked);
      if (!err) {
        todo.completed = checked;
      } else {
        ElMessage.error('修改todo失败');
      }
    };
    return {
      handleStateChange,
    };
  },
});
</script>

<style>
.todo-list {
  display: grid;
  row-gap: 14px;
}
</style>
