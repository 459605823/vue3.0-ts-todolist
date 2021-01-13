import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { Todo } from './types'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    author: string,
    todos: Todo[]
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}