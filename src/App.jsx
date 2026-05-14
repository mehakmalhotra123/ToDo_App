import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  // Initialize todos from localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [todo, setTodo] = useState("");

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const handleAdd = () => {
    if (todo.trim() === "") return;

    setTodos([...todos, { todo, isCompleted: false }]);
    setTodo("");
  };

  // Delete Todo
  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Edit Todo
  const handleEdit = (index) => {
    setTodo(todos[index].todo);
    handleDelete(index);
  };

  // Input Change
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Toggle Checkbox
  const handleCheckBox = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] text-white px-4 py-10">
        <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6 md:p-10">

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Premium Todo App
            </h1>

            <p className="text-gray-300 mt-3 text-sm md:text-base">
              Organize your tasks beautifully and stay productive.
            </p>
          </div>

          {/* Add Todo */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="What needs to be done?"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            />

            <button
              onClick={handleAdd}
              disabled={todo.trim() === ""}
              className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105 hover:shadow-violet-500/40 disabled:opacity-50 disabled:hover:scale-100 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg"
            >
              Add Task
            </button>
          </div>

          {/* Todo List */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6 text-violet-300">
              Your Tasks
            </h2>

            {todos.length === 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
                No tasks added yet ✨
              </div>
            )}

            <div className="space-y-4">
              {todos.map((item, index) => (
                <div
                  key={index}
                  className="group flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 p-5 rounded-2xl transition-all duration-300 shadow-lg"
                >
                  {/* Todo Content */}
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      onChange={() => handleCheckBox(index)}
                      checked={item.isCompleted}
                      type="checkbox"
                      className="w-5 h-5 accent-violet-500 cursor-pointer"
                    />

                    <p
                      className={`text-lg md:text-xl break-words transition-all duration-300 ${
                        item.isCompleted
                          ? "line-through text-gray-400"
                          : "text-white"
                      }`}
                    >
                      {item.todo}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 w-full md:w-auto">
                    <button
                      onClick={() => handleEdit(index)}
                      className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(index)}
                      className="flex-1 md:flex-none bg-red-600 hover:bg-red-500 px-5 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;