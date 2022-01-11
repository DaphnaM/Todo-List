import logo from './logo.svg';
import './App.css';
import Greet from './Componenets/Greet.js'
import Counter from './Componenets/Counter';
import { useState } from 'react';

const initialTasks = [
  { checked: false, text: 'clean room', id: 1 },
  { checked: true, text: 'buy food', id: 2 }
]

function App() {

  const [tasks, setTasks] = useState(initialTasks)
  const [taskInput, setTaskInput] = useState("")

  const completedTasks = tasks.filter(item => item.checked)
  const notCompleted = tasks.filter(item => !item.checked)
  function toggleItem(itemId) {

    const newTasks = tasks.map(task => {
      if (task.id !== itemId) return task
      return { ...task, checked: !task.checked }
    })
    setTasks(newTasks)
  }

  function deleteItem(itemId) {
    const newTasks = tasks.filter(task => task.id !== itemId)
    setTasks(newTasks)
  }
  function handleInputChange(e) {
    setTaskInput(e.target.value)
  }

  function addTask() {
    if (!taskInput) return
    let lastId = tasks[tasks.length - 1].id
    const newTasks = [...tasks, { checked: false, text: taskInput, id: ++lastId }]
    setTaskInput("")
    setTasks(newTasks)
  }

  return (
    <div className="App">
      <input type="text" placeholder="enter task..." value={taskInput} onChange={handleInputChange} />
      <button onClick={addTask} className="button-style add-button">Add Tasks</button>
      <ToDoList items={notCompleted} title="Tasks" onCheckboxClick={toggleItem} onDelete={deleteItem} />
      <ToDoList items={completedTasks} title="Done" onCheckboxClick={toggleItem} onDelete={deleteItem} />

    </div>
  );
}

function ToDoList({ title, items, onCheckboxClick, onDelete }) { //IS it supposed to be the same order as line 43? meaning items, title and then onClick? 

  return (<>
    <h1> {title}</h1>
    <ul>
      {items.map(item => <ListItem {...item} onCheckboxClick={onCheckboxClick} onDelete={onDelete} />)}

    </ul>
  </>
  )
}


function ListItem({ checked, text, id, onCheckboxClick, onDelete }) {
  function handleCheckboxClick(e) {
    onCheckboxClick(id)
  }
  function handleXButton() {
    onDelete(id)

  }
  return <li className="list-item">
    <input type="checkbox" checked={checked} onClick={handleCheckboxClick} />
    <span className={checked ? "done" : ""}>
      {text}</span> <button className='button-style' onClick={handleXButton}>X</button>
  </li>
}

export default App;
