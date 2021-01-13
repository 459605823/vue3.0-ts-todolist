export interface Todo {
    id: number,
    content: string,
    completed: boolean
}

export interface RawTodo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export type filter = Partial<{
    label: string,
    value: string
}>

export interface State {
    author: string,
    todos: Array<Todo>
}

export interface Getters {
    doneTodos: (state: State) => Todo[],
    undoneTodos: (state: State) => Todo[]
}


// /**
//  * Make all properties in T optional
//  */
// type Partial<T> = {
//     [P in keyof T]?: T[P];
// };

// /**
//  * Make all properties in T readonly
//  */
// type Readonly<T> = {
//     readonly [P in keyof T]: T[P];
// };

// /**
//  * Construct a type with a set of properties K of type T
//  */
// type Record<K extends keyof any, T> = {
//     [P in K]: T;
// };

// type coord = Record<'x' | 'y', number>

// /**
//  * From T, pick a set of properties whose keys are in the union K
//  */
// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// };

// type coordX = Pick<coord, 'x'>

// /**
//  * Make all properties in T required
//  */
// type Required<T> = {
//     [P in keyof T]-?: T[P];
// };