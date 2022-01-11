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
      <ToDoList items={notCompleted} title="Tasks" onClick={toggleItem} />
      <ToDoList items={completedTasks} title="Done" onClick={toggleItem} />

    </div>
  );
}

function ToDoList({ title, items, onClick }) { //IS it supposed to be the same order as line 43? meaning items, title and then onClick? 

  return (<>
    <h1> {title}</h1>
    <ul>
      {items.map(item => <ListItem {...item} onClick={onClick} />)}

    </ul>
  </>
  )
}
function MarkCrossed() {
  //if checked, add to classedlist chcked 
}

function ListItem({ checked, text, id, onClick }) {
  function handleClick(e) {
    onClick(id)
  }
  return <li className="list-item">
    <input type="checkbox" checked={checked} onClick={handleClick} />
    <span className={checked ? "done" : ""}>
      {text}</span> <button className='button-style' >X</button>
  </li>
}

export default App;
