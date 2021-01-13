import { onMounted } from "vue";
import { Todo, RawTodo } from '@/types';
import { useStore } from '@/store'

export default function useTodos(): { todos: Array<Todo>, addTodo: (todo: Todo) => void } {
  const store = useStore()

  // 获取远程 todos
  const fetchTodos = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const rawTodos = await response.json();
    const todos = rawTodos.map((todo: Partial<RawTodo>) => ({
      id: todo.id,
      content: todo.title,
      completed: todo.completed,
    }));
    store.commit('setTodos', todos)
  };

  onMounted(() => {
    fetchTodos();
  });

  return {
    todos: store.state.todos,
    addTodo: (todo) => store.commit('addTodo', todo),
  };
}
