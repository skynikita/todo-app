import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import ItemForm from "../components/ItemForm";
import ItemCard from "../components/ItemCard";



const item = {
  name: "Item 1",
  content: "This is the first item",
  priority: "High",
  completed: false
}


test("fill in the New Task Form", async () =>{
  render(<App />)
  fireEvent.click(screen.getByText(/Add a New Task/i))
  await waitFor(()=> screen.getByText(/save/i))
  expect(screen.getByText(/save/i)).toBeInTheDocument()
  fireEvent.change(screen.getByLabelText(/Task Name/), {
    target: { value: "Item 1" }
  })
  fireEvent.change(screen.getByLabelText(/Task Description/), {
    target: { value: "This is the first item" }
  })
  fireEvent.change(screen.getByLabelText(/^Priority$/), {
    target: { value: "High" }
  })
  fireEvent.change(screen.getByLabelText(/Completed/), {
    target: { checked: false }
  })
  await waitFor(() => screen.getByText(/Cancel/i))
  expect(screen.getByLabelText(/Task Name/)).toHaveValue("Item 1")
  expect(screen.getByLabelText(/Task Description/)).toHaveValue(
      "This is the first item"
  )
  expect(screen.getByLabelText(/^Priority$/)).toHaveValue("High")
  expect(screen.getByLabelText(/Completed/)).not.toBeChecked()
  fireEvent.click(screen.getByText(/save/i))
  await waitFor(() => screen.getByText(/Add a New Task/i))
})

test("delete a task", async () => {
  window.confirm = jest.fn(() => true)
  render(<App />)
  fireEvent.click(screen.queryAllByText(/^Delete$/)[0])
  expect(window.confirm).toBeCalledWith("Delete this task?")
  await waitFor(() => screen.queryAllByText("Delete"))
  expect(screen.queryAllByText(/Delete/i)).toHaveLength(4)
  expect(screen.getByText(/total: 4 tasks/i)).toBeInTheDocument()
})

test("change sorting method", async () => {
  render(<App />)
  fireEvent.click(screen.getByText(/Sort By Priority/i))
  await waitFor(() => screen.getByText(/Sort By Priority/i))
  expect(screen.getByLabelText(/Sort By Priority/i)).toBeChecked()
  expect(screen.getByLabelText(/Sort By name/i)).not.toBeChecked()
  fireEvent.click(screen.getByText(/Sort By Name/i))
  await waitFor(() => screen.getByText(/Sort By Name/i))
  expect(screen.getByLabelText(/Sort By Name/i)).toBeChecked()
  expect(screen.getByLabelText(/Sort By Priority/i)).not.toBeChecked()
})



test("change field values", async () => {
  render(<ItemForm {...item} />)
  // change task name
  fireEvent.change(screen.getByLabelText(/Task Name/), {
    target: { value: "Todo Task 1#" }
  })
  await waitFor(() => screen.getByLabelText(/Task Name/))
  expect(screen.getByLabelText(/Task Name/)).toHaveValue("Todo Task 1#")

  // change task content
  fireEvent.change(screen.getByLabelText(/Task Description/), {
    target: { value: "This is Todo Task One#" }
  })
  await waitFor(() => screen.getByLabelText(/Task Description/))
  expect(screen.getByLabelText(/Task Description/)).toHaveValue(
      "This is Todo Task One#"
  )

// change task priority
fireEvent.change(screen.getByLabelText(/Priority/), {
  target: { value: "Medium" }
})
await waitFor(() => screen.getByLabelText(/Priority/))
expect(screen.getByLabelText(/Priority/)).toHaveValue("Medium")

// change completed status
fireEvent.change(screen.getByLabelText(/Completed/), {
  target: { checked: true }
})
await waitFor(() => screen.getByLabelText(/Completed/))
expect(screen.getByLabelText(/Completed/)).toBeChecked(true)
})






