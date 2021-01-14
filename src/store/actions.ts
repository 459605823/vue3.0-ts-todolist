import { ActionTree, ActionContext } from 'vuex'
import { State } from './index'
import { RawTodo } from '@/types'
import { Mutations } from './mutations'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'

// 根据实际mutation重写commit
type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
  } & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
    [ActionTypes.FETCH_TODOS]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.FETCH_TODOS]({ commit }) {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );
      const rawTodos = await response.json();
      const todos = rawTodos.map((todo: Partial<RawTodo>) => ({
        id: todo.id,
        content: todo.title,
        completed: todo.completed,
      }));
      commit(MutationTypes.SET_TODOS, todos)
    }
}