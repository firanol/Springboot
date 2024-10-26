import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getTasks, createTask, deleteTask, updateTask } from '../../api/service/taskService';

export interface Task {
    id: number;
    name: string;
    done: boolean;
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async ({name = '', status = 'all'}: {name?: string, status?: string} = {}) => {
        const response = await getTasks(name, status);
        return response.data;
    }
);

export const createTaskThunk = createAsyncThunk('tasks/createTask', async (newTask: Task) => {
    const response = await createTask(newTask);
    return response.data;
});

export const deleteTaskThunk = createAsyncThunk('tasks/deleteTask', async (id: number) => {
    await deleteTask(id);
    return id;
});

export const updateTaskThunk = createAsyncThunk('tasks/updateTask', async (updatedTask: Task) => {
    const response = await updateTask(updatedTask.id, updatedTask);
    return response.data;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load tasks';
            })
            .addCase(createTaskThunk.fulfilled, (state, action: PayloadAction<Task>) => {
                state.tasks.push(action.payload);
            })
            .addCase(createTaskThunk.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to create task';
            })
            .addCase(deleteTaskThunk.fulfilled, (state, action: PayloadAction<number>) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(deleteTaskThunk.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete task';
            })
            .addCase(updateTaskThunk.fulfilled, (state, action: PayloadAction<Task>) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTaskThunk.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update task';
            });
    },
});

export const selectTasks = (state: RootState) => state.tasks.tasks;

export default taskSlice.reducer;
