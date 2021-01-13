import { computed, Ref } from "vue";
import { useStore } from '@/store'

export default function useFilteredTodos(filter: Ref<string>) {
  const store = useStore()

  // 过滤 todo
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case "done":
        return store.getters.doneTodos;
      case "todo":
        return store.getters.undoneTodos;
      default:
        return store.state.todos;
    }
  });

  return { filter, filteredTodos };
}
