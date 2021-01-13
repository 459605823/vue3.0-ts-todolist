import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store, GetterTree } from "vuex";
import { Todo, State, Getters, } from '@/types'

export const key: InjectionKey<Store<State>> = Symbol()

const getters: GetterTree<State, State> & Getters = {
  doneTodos(state) {
    return state.todos.filter(todo => todo.completed)
  },
  undoneTodos(state) {
    return state.todos.filter(todo => !todo.completed)
  }
}

export const store = createStore<State>({
  state: {
    author: 'wjn',
    todos: []
  },
  getters,
  mutations: {
    addTodo(state, todo: Todo) {
      state.todos.push(todo)
    },
    setTodos(state, todos: Array<Todo>) {
      state.todos = todos
    }
  },
  actions: {},
  modules: {}
});

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}
