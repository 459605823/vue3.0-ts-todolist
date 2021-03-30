import { onMounted } from 'vue';
import { todo, response } from '@/types';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import api from '@/api';
import { ElMessage } from 'element-plus';

export default function useTodos(): {
  todos: Array<todo>;
  addTodo: (todo: todo) => void;
} {
  const store = useStore();
  const addTodo = async (todo: { content: string }) => {
    const res = await api.post('todo', { json: todo }).json<response>();
    if (res.errno) {
      ElMessage.success('添加todo成功');
      store.dispatch(ActionTypes.FETCH_TODOS);
    } else {
      ElMessage.error(res.data ? res.data : '添加todo失败');
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
