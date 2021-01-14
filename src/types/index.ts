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