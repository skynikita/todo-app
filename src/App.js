import React, { useState } from "react"
import sampleData from "./sampleData";
import TodoList from "./components/List"
import TodoItemForm from "./components/ItemForm"
import "bootstrap/dist/css/bootstrap.css"
import SortingRatioButtons from "./components/SortingRadioButtons";

function App() {
  const [tasks, setTasks] = useState(sampleData || [])
  const [method, setMethod] = useState("Priority")
  const [isAddingTask, setIsAddingTask] = useState(false)

  const createNewTask = (values) => {
    const newTaskId = new Date().toISOString()
    setTasks([...tasks, { id: newTaskId, ...values }])
    setIsAddingTask(false)
  }

  return (
      <div className="container p-3">
        <h3>{`Total: ${tasks.length} tasks`}</h3>
        <h3>{`Completed: ${tasks.filter((t) => t.completed).length} tasks`}</h3>
        <SortingRatioButtons method={method} onSelect={setMethod} />
        {isAddingTask ? (
            <TodoItemForm
                onSave={createNewTask}
                onCancel={() => {
                  setIsAddingTask(false)
                }}
            />
        ) : (
            <button
                className="btn btn-primary m-1"
                onClick={() => {
                  setIsAddingTask(true)
                }}
            >
              Add a New Task
            </button>
        )}
        <TodoList tasks={tasks} setTasks={setTasks} sortMethod={method} />
      </div>
  )
}

export default App
