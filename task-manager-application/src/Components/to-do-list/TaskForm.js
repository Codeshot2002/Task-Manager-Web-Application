import {useState} from "react";
import './task.css';
export default function TaskForm({onAdd}) {
  const [taskName,setTaskName] = useState('');
  function handleSubmit(ev) {
    ev.preventDefault();
    onAdd(taskName);
    setTaskName('');
  }
  return (
    <form onSubmit={handleSubmit} className="taskform">
      <button>+</button>
      <input type="text"
             value={taskName}
             onChange={ev => setTaskName(ev.target.value)}
             placeholder="Your next task..."/>
    </form>
  );
}