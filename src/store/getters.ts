import {GetterTree} from 'vuex';
import {todo} from '@/types';
import {State} from './index';

export interface Getters {
  doneTodos(state: State): todo[];
  undoneTodos(state: State): todo[];
}

export const getters: GetterTree<State, State> & Getters = {
  doneTodos(state) {
    return state.todos.filter(todo => todo.completed);
  },
  undoneTodos(state) {
    return state.todos.filter(todo => !todo.completed);
  },
};
