import { onMounted } from "vue";
import { Todo } from '@/types';
import { useStore } from '@/store'
import { ActionTypes } from '@/store/action-types'
import { MutationTypes } from '@/store/mutation-types'

export default function useTodos(): { todos: Array<Todo>, addTodo: (todo: Todo) => void } {
  const store = useStore()

  onMounted(() => {
    store.dispatch(ActionTypes.FETCH_TODOS);
  });

  return {
    todos: store.state.todos,
    addTodo: (todo) => store.commit(MutationTypes.ADD_TODO, todo),
  };
}
