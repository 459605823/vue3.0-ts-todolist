import { GetterTree } from 'vuex'
import { Todo } from '@/types'
import { State } from './index'

export interface Getters {
    doneTodos(state: State): Todo[],
    undoneTodos(state: State): Todo[]
}

export const getters: GetterTree<State, State> & Getters = {
    doneTodos(state) {
      return state.todos.filter(todo => todo.completed)
    },
    undoneTodos(state) {
      return state.todos.filter(todo => !todo.completed)
    }
}