import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import NotFound from "./components/Notfound";
import Sidebar from "./components/Sidebar";
import ChatAssistant from "./components/ChatAssistant";
import "./App.css";

const ProtectedRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchTodos();
    }
  }, [token]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5001/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (title) => {
    try {
      const newTodo = { title, completed: false };
      const response = await axios.post("http://localhost:5001/todos", newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      const response = await axios.put(`http://localhost:5001/todos/${id}`, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const editTodo = async (id, updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/todos/${id}`,
        updatedTask
      );
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsLoggedIn(true);
    navigate("/TodoForm");
  };

  return (
    <div className="App">
      {isLoggedIn &&
        location.pathname !== "/login" &&
        location.pathname !== "/home"}
      {/* Render Sidebar only if logged in and not on the Home or Login page */}
      
      {/* Add AI Assistant here without affecting existing UI */}
      <ChatAssistant />

      <main className="app-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/TodoForm"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={
                  <div className="app-content">
                    <Sidebar />
                    <div className="todo-content">
                      <TodoForm onAdd={addTodo} />
                      <TodoList
                        todos={todos}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onEdit={editTodo}
                      />
                    </div>
                  </div>
                }
              />
            }
          />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;