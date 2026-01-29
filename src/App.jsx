import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  // Initialize todos from localStorage 
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [todo, setTodo] = useState("")

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // Add Todo
  const handleAdd = () => {
    if (todo.trim() === "") return

    setTodos([...todos, { todo, isCompleted: false }])
    setTodo("")
  }

  // Delete Todo
  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  //  Edit Todo
  const handleEdit = (index) => {
    setTodo(todos[index].todo)
    handleDelete(index)
  }

  //  Input Change
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  // Toggle Checkbox
  const handleCheckBox = (index) => {
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5 p-5 bg-violet-100 rounded-2xl min-h-[80vh]">

        {/* Add Todo */}
        <div className="addTodo">
          <h2 className="text-lg font-bold my-3">Add a Todo</h2>

          <input
            onChange={handleChange}
            value={todo}
            className="bg-white w-80 px-3 py-1 rounded"
            type="text"
            placeholder="Enter your todo"
          />

          <button
            onClick={handleAdd}
            disabled={todo.trim() === ""}
            className="bg-violet-900 hover:bg-violet-700 disabled:bg-gray-400 mx-6 p-3 py-1 text-sm shadow-2xl text-white rounded-lg transition-all duration-75"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <h1 className="text-lg font-bold mt-6">Your Todos</h1>

        <div className="todos mt-4">
          {todos.length === 0 && (
            <p className="text-gray-600">No Todos Yet </p>
          )}

          {todos.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-3 rounded-lg my-2"
            >

              <div
                className={
                  item.isCompleted
                    ? "line-through text-red-700 font-bold text-2xl"
                    : "text-2xl"
                }
              >
                <input
                  onChange={() => handleCheckBox(index)}
                  checked={item.isCompleted}
                  type="checkbox"
                  className="mx-4"
                />

                {item.todo}
              </div>

              <div className="buttons">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-violet-900 hover:bg-violet-700 mx-3 p-3 py-1 text-sm shadow-2xl text-white rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="bg-violet-900 hover:bg-violet-700 p-3 py-1 text-sm shadow-2xl text-white rounded-lg"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default App
