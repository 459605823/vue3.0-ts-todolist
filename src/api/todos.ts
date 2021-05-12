import api from './index'

export const updateTodo = (id: string, completed: boolean) => api.put('todo/' + id, { json: { completed }})
export const fetchTodo = () => api.get('todo')
export const deleteTodo = (id: string) => api.delete('todo/' + id)
export const addTodo = (todo: { content: string}) => api.post('todo', { json: todo })