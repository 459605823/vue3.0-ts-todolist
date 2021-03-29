import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { todo } from '@/types';
import { State } from './index';

export interface Mutations<S = State> {
  [MutationTypes.ADD_TODO](state: S, payload: todo): void;
  [MutationTypes.SET_TODOS](state: S, payload: todo[]): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_TODO](state, todo: todo) {
    state.todos.push(todo);
  },
  [MutationTypes.SET_TODOS](state, todos: Array<todo>) {
    state.todos = todos;
  },
};
