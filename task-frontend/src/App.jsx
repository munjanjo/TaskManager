import "./App.css";
import { getTasks, deleteTask, addTask, markAsCompleted, updateTitle } from "./task.js";
import { useEffect, useState } from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);

    const loadTasks = () => {
        getTasks()
            .then((data) => setTasks(data))
            .catch((err) => console.error("Greška kod getTasks:", err));
    };

    const markCompleted = (id) => {
        markAsCompleted(id)
            .then(() => loadTasks())
            .catch((err) => console.log(err));
    };

    const updateTask = (id, newTitle) => {
        return updateTitle(id, newTitle)
            .then(() => loadTasks())
            .catch((err) => console.log(err));
    };

    const delTask = (id) => {
        deleteTask(id)
            .then(() => {
                loadTasks();
            })
            .catch((err) => {
                console.error("Greška kod brisanja:", err);
                alert("Greška kod brisanja (status 500) – pogledaj backend log.");
            });
    };

    // 🔹 otvori modal za ADD
    const openAddModal = () => {
        setIsEditing(false);
        setEditingTaskId(null);
        setNewTitle("");
        setShowModal(true);
    };

    // 🔹 otvori modal za EDIT (s popunjenim titleom)
    const openEditModal = (task) => {
        setIsEditing(true);
        setEditingTaskId(task.id);
        setNewTitle(task.title);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setIsEditing(false);
        setEditingTaskId(null);
    };

    // 🔹 spremanje (dodavanje ili edit)
    const handleSave = async () => {
        if (!newTitle.trim()) {
            alert("Title ne smije biti prazan.");
            return;
        }

        try {
            if (isEditing && editingTaskId != null) {
                await updateTask(editingTaskId, newTitle.trim());
            } else {
                await addTask(newTitle.trim());
            }
            closeModal();
            loadTasks();
        } catch (err) {
            console.error("Greška kod spremanja taska:", err);
            alert("Greška kod spremanja taska – pogledaj backend log.");
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div className="app">
            <h1>Task Manager</h1>

            <div className="top-buttons">
                <button className="nav-menu-button" onClick={loadTasks}>
                    Refresh
                </button>
                <button className="nav-menu-button add-button" onClick={openAddModal}>
                    Add Task
                </button>
            </div>

            {tasks.length === 0 ? (
                <h3 className="no-tasks">No tasks</h3>
            ) : (
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li className="task-item" key={task.id}>
              <span className="task-main">
                <span className="task-title">{task.title}</span>
                <span className="task-id">#{task.id}</span>
              </span>
                            <span className="task-status">
                {task.completed ? "✅ Completed" : "🕒 Not completed"}
              </span>

                            <button
                                className="finished-btn"
                                onClick={() => markCompleted(task.id)}
                            >
                                Mark as finished
                            </button>

                            <button
                                className="finished-btn"
                                onClick={() => openEditModal(task)}
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => delTask(task.id)}
                                className="delete-btn"
                            >
                                ✖
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* MODAL ZA ADD / EDIT */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{isEditing ? "Edit Task" : "Add New Task"}</h2>

                        <input
                            type="text"
                            placeholder="Enter title..."
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="modal-input"
                        />

                        <div className="modal-buttons">
                            <button onClick={handleSave} className="nav-menu-button">
                                Save
                            </button>
                            <button
                                onClick={closeModal}
                                className="nav-menu-button cancel-button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
