import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState("all");


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

 
    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

  
    const toggleComplete = (id) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? {
                          ...todo,
                          status:
                              todo.status === "ACTIVE" ? "COMPLETED" : "ACTIVE",
                      }
                    : todo
            )
        );
    };

    //suuld hiisen oorchlolt

    const completedTasksCount = todos.filter(
        (todo) => todo.status === "COMPLETED"
    ).length;
    const totalTasks = todos.length;

    const clearCompleted = () => {
        setTodos((prev) => prev.filter((todo) => todo.status !== "COMPLETED"));
    };

  
    const filteredTodos = () => {
        if (filter === "all") return todos;
        else if (filter === "active")
            return todos.filter((todo) => todo.status === "ACTIVE");
        else if (filter === "completed")
            return todos.filter((todo) => todo.status === "COMPLETED");
    };

    const filterMessage = () => {
        if (filter === "all") {
            return todos.length === 0
                ? "No tasks yet. Add one above!"
                : "Showing all tasks.";
        } else if (filter === "active") {
            const activeTasks = todos.filter((todo) => !todo.completed);
            return activeTasks.length === 0
                ? "No active tasks found."
                : "Showing active tasks.";
        } else if (filter === "completed") {
            const completedTasks = todos.filter((todo) => todo.completed);
            return completedTasks.length === 0
                ? "No completed tasks found."
                : "Showing completed tasks.";
        }
        return "Invalid filter.";
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
                    <button
                        onClick={() => setFilter("all")}
                        className={filter === "all" ? "active" : ""}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter("active")}
                        className={filter === "active" ? "active" : ""}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setFilter("completed")}
                        className={filter === "completed" ? "active" : ""}
                    >
                        Completed
                    </button>
                </div>

                <div className="filter-message">
                    <p>{filterMessage()}</p>
                </div>

                {/* To-Do List */}
                <ul>
                    {filteredTodos().map((todo) => (
                        <li
                            id="taskContainer"
                            key={todo.id}
                            className={
                                todo.status === "COMPLETED" ? "completed" : ""
                            }
                        >
                            <input
                                type="checkbox"
                                checked={todo.status === "COMPLETED"}
                                onChange={() => toggleComplete(todo.id)}
                            />
                            <span>{todo.description}</span>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

                {todos.length !== 0 && (
                    <div className="summary-container">
                        <div className="summary-text">
                            {completedTasksCount} of {todos.length} tasks
                            completed
                        </div>
                        <div className="clear-task">
                            {completedTasksCount > 0 && (
                                <button id="clearButton" onClick={clearCompleted}>
                                    Clear Completed
                                </button>
                            )}
                        </div>
                    </div>
                )}
                <div>
                    <p>
                        Powered by{" "}
                        <a href="https://pinecone.mn/">Pinecone Academy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
