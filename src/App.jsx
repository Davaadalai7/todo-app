import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState("all");

    // Function to add a new to-do
    const addTodo = () => {
        if (newTodo.trim().length === 0) {
            setError(true);
        } else {
            setTodos((prev) => [
                ...prev,
                { description: newTodo, id: uuidv4(), status: "ACTIVE" },
            ]);
            setNewTodo("");
            setError(false);
        }
    };

    // Function to delete a to-do
    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    // Function to toggle task completion status
    const toggleComplete = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, status: todo.status === "ACTIVE" ? "COMPLETED" : "ACTIVE" }
                    : todo
            )
        );
    };

    // Function to filter tasks based on the selected filter
    const filteredTodos = () => {
        if (filter === "all") return todos;
        if (filter === "active") return todos.filter((todo) => todo.status === "ACTIVE");
        if (filter === "completed") return todos.filter((todo) => todo.status === "COMPLETED");
    };

    return (
        <div className="container">
            <div className="app">
                <h1>To-Do List</h1>
                {error && <div className="error">Please enter a task.</div>}

                <div className="input-container">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new task..."
                    />
                    <button onClick={addTodo}>Add</button>
                </div>

                {/* Filter Buttons */}
                <div className="filters">
                    <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
                        All
                    </button>
                    <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>
                        Active
                    </button>
                    <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>
                        Completed
                    </button>
                </div>

                {/* To-Do List */}
                <ul>
                    {filteredTodos().map((todo) => (
                        <li key={todo.id} className={todo.status === "COMPLETED" ? "completed" : ""}>
                            <input
                                type="checkbox"
                                checked={todo.status === "COMPLETED"}
                                onChange={() => toggleComplete(todo.id)}
                            />
                            <span>{todo.description}</span>
                            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

                <div>
                    <p>Powered by <a href="https://pinecone.mn/">Pinecone Academy</a></p>
                </div>
            </div>
        </div>
    );
}

export default App;
