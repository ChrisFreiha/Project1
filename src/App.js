import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  Math.floor(Math.random() * 100); 

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.comlpete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === "") return
    setTodos(prevTodos => {
      return [...prevTodos, {id: Math.random(), name: name, complete: false}]

    })

    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <h2>Todo List</h2>
      <input ref={todoNameRef} type="text" /> <br></br>

      <button onClick={handleAddTodo}>Add Item to Todo List</button> 
      <button onClick={handleClearTodos}>Clear Completed</button>

      <TodoList todos = {todos} toggleTodo = {toggleTodo} class="strikethrough" />
      
    </>
  );


}

export default App;
