import { onMounted } from 'vue';
import { todo } from '@/types';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import {addTodo as addTodoApi} from '@/api/todos';
import { ElMessage } from 'element-plus';

export default function useTodos(): {
  todos: Array<todo>;
  addTodo: (todo: { content: string }) => void;
} {
  const store = useStore();
  const addTodo = async (todo: { content: string }) => {
    const {err} = await addTodoApi(todo);
    if (!err) {
      ElMessage.success('添加todo成功');
      store.dispatch(ActionTypes.FETCH_TODOS);
    }
  };
  onMounted(() => {
    store.dispatch(ActionTypes.FETCH_TODOS);
  });

  return {
    todos: store.state.todos,
    addTodo,
  };
}
