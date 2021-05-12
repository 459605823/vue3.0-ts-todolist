import { ActionTree, ActionContext } from 'vuex';
import { State } from './index';
import { Mutations } from './mutations';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';
import {fetchTodo} from '@/api/todos';
import { rawTodo, todo } from '@/types';

// 根据实际mutation重写commit
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.FETCH_TODOS]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.FETCH_TODOS]({ commit }) {
    const {err, res} = await fetchTodo();
    if (!err) {
      const todos: todo[] = res.map((todo: rawTodo) => ({
        id: todo._id,
        content: todo.content,
        completed: todo.completed,
      }));
      commit(MutationTypes.SET_TODOS, todos);
    }
  },
};
