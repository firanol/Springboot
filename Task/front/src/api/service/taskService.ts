import http from '../axios'
import {Task} from "../../features/tasks/taskSlice";

export const authAction = (action: string, payload: any) => {
    let url = action === 'Login' ? '/auth/login' : '/auth/register';
    return http.post(url, payload);
}

export const getTasks = (q:string = '') => {
    if (q) {
        return http.get(`/tasks?q=${q}`);
    }
    return http.get('/tasks');
}
export const getTaskById = (id: number) => http.get(`/tasks/${id}`);
export const createTask = (task: Task) => http.post('/tasks', task);
export const updateTask = (id: number, task: Task) => http.put(`tasks/${id}`, task);
export const deleteTask = (id: number) => http.delete(`tasks/${id}`);
