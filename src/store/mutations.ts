import {MutationTree} from 'vuex';
import {MutationTypes} from './mutation-types';
import {todo, user} from '@/types';
import {State} from './index';

export interface Mutations<S = State> {
  [MutationTypes.ADD_TODO](state: S, payload: todo): void;
  [MutationTypes.SET_USER](state: S, payload: user): void;
  [MutationTypes.SET_TODOS](state: S, payload: todo[]): void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.ADD_TODO](state, todo: todo) {
    state.todos.push(todo);
  },
  [MutationTypes.SET_USER](state, user: user) {
    state.user = user;
  },
  [MutationTypes.SET_TODOS](state, todos: Array<todo>) {
    state.todos = todos;
  },
};
