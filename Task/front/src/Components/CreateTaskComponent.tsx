import React, { useState } from 'react';
import {useAppDispatch} from "../app/hooks";
import {createTaskThunk} from "../features/tasks/taskSlice";  // Import the NewTask type

const CreateTaskComponent: React.FC = () => {
    const [name, setName] = useState('');
    const dispatch = useAppDispatch();

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: any = { name, done: false };
        dispatch(createTaskThunk(newTask));
        setName('');
    };

    return (
        <form onSubmit={handleCreateTask}>
            <h3>Create Task</h3>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Task Title"
            />
            <hr />
            <button type="submit">Create Task</button>
        </form>
    );
};

export default CreateTaskComponent;
