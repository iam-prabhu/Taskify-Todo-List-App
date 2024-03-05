import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  const saveToLS=(params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const toggleFinished=(e) => {
    setshowfinished(!showfinished)
  }
  
  
  useEffect(()=>{
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }

  },[])


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLS();
  }
  const handleDelete = (e, id) => {


    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLS();
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS();
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
    saveToLS();

  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      {
        return item.id === id;
      }
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS();
  }

  return (
    <>
      <Navbar />

      <div className=" mx-2 md:container md:mx-auto my-5 rounded-xl p-8 py-1  bg-blue-100 min-h-[80vh]  md:w-1/2">
        <h1 className="font-bold text-3xl text-center">
          Taskify - Keep track of all your daily tasks
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold"> Add A TODO</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1 my-3 ' />
          <button onClick={handleAdd} disabled={todo.length<1} className='bg-violet-800 disabled:bg-violet-950 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-6'>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showfinished} />Show Finished
        <h2 className='text-lg font-bold my-5'>Your TODOs</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'> No TODOs to display</div>}
          {todos.map(item => {


            return (showfinished || !item.isCompleted) &&  <div key={item.id} className="item md:flex justify-between w-1/2 my-3">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><FaRegEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /> </button>
              </div>
            </div>

          })}
        </div>
      </div>
    </>
  )
}

export default App
