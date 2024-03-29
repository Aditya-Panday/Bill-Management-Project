import React, { useState, useEffect } from 'react';

export default function Todo() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }

    }, []);




    // const addTask = () => {
    //     if (inputValue.trim() !== '') { //agar alue blank na ho toh
    //         setTasks([...tasks, { id: Date.now(), text: inputValue }]);
    //         setInputValue('');
    //         localStorage.setItem('tasks', JSON.stringify(tasks));
    //     }
    // };
    const addTask = () => {
        if (inputValue.trim() !== '') {
            const newTask = { id: tasks.length + 1, text: inputValue }; // Increment id by 1
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            setInputValue('');
        }
    };

    const deleteTask = id => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update local storage
    };


    const editTask = (id, newText) => {
        const edTask = (tasks.map(task => (task.id === id ? { ...task, text: newText } : task)));
        setTasks(edTask);
        localStorage.setItem('tasks', JSON.stringify(edTask)); // Update local storage

    };

    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (

        <div>
            <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <br />
            <button onClick={addTask}>Add Task</button>
            <br />
            <input
                type="text"
                placeholder="Search Tasks"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredTasks.map(task => (
                    <li key={task.id}>
                        {task.text}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        <button
                            onClick={() => {
                                const newText = prompt('Edit Task:', task.text);
                                if (newText !== null) {
                                    editTask(task.id, newText);
                                }
                            }}
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
