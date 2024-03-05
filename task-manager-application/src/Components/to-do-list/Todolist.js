import "./task.css"
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";
import axios from 'axios'
import { FaViacoin } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  }, []);

  function addTask(name) {
    if(!name == ""){
      setTasks(prev => {
      return [...prev, { name: name, done: false }];
    });
    }
  }

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject, index) => index !== indexToRemove);
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete / numberTotal * 100;
    if (percentage === 0) {
      return 'Try to do at least one! 🙏';
    }
    if (percentage === 100) {
      return 'Nice job for today! 🏝';
    }
    return 'Keep it going 💪🏻';
  }

  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  const handleAuth = () => {
    axios.get('http://localhost:8081/checkAuth', {
      headers: {
        'access-token': localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res);
        alert(res.data);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="main">
      <div className="box">
        <div className="auth">
          <button className="button-9" onClick={handleAuth}>VERIFY AUTH</button>
        </div>
        <h1 className="txt_field">{numberComplete}/{numberTotal} Complete</h1>
        <h2 className="txt_field">{getMessage()}</h2>

        <TaskForm onAdd={addTask} />
        {tasks.map((task, index) => (
          <Task {...task}
            onRename={newName => renameTask(index, newName)}
            onTrash={() => removeTask(index)}
            onToggle={done => updateTaskDone(index, done)} />
        ))}
      </div>
    </div>
  );
}

export default App;
