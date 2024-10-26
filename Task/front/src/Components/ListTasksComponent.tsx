import React, {useEffect, useState, FC} from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {fetchTasks, deleteTaskThunk, updateTaskThunk, selectTasks, Task} from '../features/tasks/taskSlice';

const ListTasksComponent: FC = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');  // Changed to string with 'all' default
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(selectTasks);
    const loading = useAppSelector((state) => state.tasks.loading);
    const error = useAppSelector((state) => state.tasks.error);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleTaskDeleted = (id: number) => {
        dispatch(deleteTaskThunk(id));
    };

    const handleTaskEdited = (task: Task) => {
        const newName = prompt('Edit task name', task.name);
        if (newName) {
            dispatch(updateTaskThunk({ ...task, name: newName }));
        }
    };

    const handleTaskToggled = (task:Task) => {
        dispatch(updateTaskThunk({ ...task, done: !task.done }));
    };

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    // Filter tasks based on search and status
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' ? true :
                statusFilter === 'done' ? task.done :
                    statusFilter === 'pending' ? !task.done :
                        true;

        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            <h3>Task List</h3>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Search tasks"
                    onChange={handleSearchChange}
                    value={search}
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="done">Done</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            {loading && <p>Loading tasks...</p>}
            {error && <p>Error: {error}</p>}

            {filteredTasks.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                            <td>{task.done ? 'Done' : 'Pending'}</td>
                            <td>
                                <button onClick={() => handleTaskEdited(task)}>Edit</button>
                                <button onClick={() => handleTaskDeleted(task.id)}>Delete</button>
                                <button onClick={() => handleTaskToggled(task)}>Toggle</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListTasksComponent;