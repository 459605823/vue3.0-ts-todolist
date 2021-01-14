import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";
import { Todo } from '@/types'
import { Getters, getters } from './getters'
import { Mutations, mutations } from './mutations'
import { Actions, actions } from './actions'

export const key: InjectionKey<VuexStore<State>> = Symbol()

export interface State {
  author: string,
  todos: Array<Todo>
}


export const store = createStore<State>({
  state: {
    author: 'wjn',
    todos: []
  },
  getters,
  mutations,
  actions,
  modules: {}
});

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key) as Store
}
