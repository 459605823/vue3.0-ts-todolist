import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { Todo } from '@/types'
import { State } from './index'

export interface Mutations<S = State> {
    [MutationTypes.ADD_TODO](state: S, payload: Todo): void,
    [MutationTypes.SET_TODOS](state: S, payload: Todo[]): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.ADD_TODO](state, todo: Todo) {
      state.todos.push(todo)
    },
    [MutationTypes.SET_TODOS](state, todos: Array<Todo>) {
      state.todos = todos
    }
}