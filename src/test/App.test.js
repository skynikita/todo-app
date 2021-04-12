import { render, screen } from '@testing-library/react';
import App from '../App';



const item_1 = {
  name: "Item 1",
  content: "This is the first item",
  priority: "High",
  completed: false
}
test("renders add new task button", () => {
  render(<App />)
  const addNewTaskButton = screen.getByText(/Add a no Task/i)
  expect(addNewTaskButton).toBeInTheDocument()
})

test("fill in the New Task Form", () =>{
  render(<App />)


})
