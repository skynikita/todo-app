import React, { useState } from "react"
import PropTypes from "prop-types"

const TodoItemForm = (props) => {
    const { onSave, onCancel, ...defaultValues } = props
    const [values, setValues] = useState(
        defaultValues.name
            ? defaultValues
            : {
                name: "",
                content: "",
                priority: "High",
                completed: false
            }
    )

    const onTaskUpdate = (field, value) => {
        const newValue = { ...values, [field]: value }
        setValues(newValue)
    }

    const onSubmitForm = () => {
        if (!values.name) {
            return alert("Please enter task name!")
        }
        onSave(values)
    }

    return (
        <div className="card container container-sm container-md container-lg container-xl container-xxl p-3 mt-3">
            <div className="form-group">
                <label htmlFor="todo-name" className="float-left">
                    Task Name
                </label>
                <input
                    type="text"
                    id="todo-name"
                    className="form-control"
                    placeholder="Enter your task name..."
                    value={values.name}
                    onChange={(e) => {
                        onTaskUpdate("name", e.target.value)
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="task-desc" className="float-left">
                    Task Description
                </label>
                <textarea
                    type="text"
                    className="form-control"
                    id="task-desc"
                    placeholder="Enter your task content..."
                    value={values.content}
                    onChange={(e) => {
                        onTaskUpdate("content", e.target.value)
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="priority-select" className="float-left">
                    Priority
                </label>
                <select
                    id="priority-select"
                    className="form-control"
                    value={values.priority}
                    onChange={(e) => {
                        onTaskUpdate("priority", e.target.value)
                    }}
                >
                    <option key="high" value="High">
                        High
                    </option>
                    <option key="medium" value="Medium">
                        Medium
                    </option>
                    <option key="low" value="Low">
                        Low
                    </option>
                </select>
            </div>
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="completed-checkbox"
                    checked={values.completed}
                    onChange={(e) => {
                        onTaskUpdate("completed", e.target.checked)
                    }}
                />
                <label className="form-check-label" htmlFor="completed-checkbox">
                    Completed
                </label>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-secondary m-1" onClick={onCancel}>
                    Cancel
                </button>
                <button className="btn btn-success m-1" onClick={onSubmitForm}>
                    Save
                </button>
            </div>
        </div>
    )
}

TodoItemForm.propTypes = {
    name: PropTypes.string,
    content: PropTypes.string,
    priority: PropTypes.oneOf(["High", "Medium", "Low"]),
    completed: PropTypes.bool,
    onSave: PropTypes.func,
    onCancel: PropTypes.func
}

export default TodoItemForm
