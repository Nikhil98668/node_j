import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// Define todo item interface
interface TodoItem {
  id: number;
  text: string;
}

// Initialize express app
const app = express();
app.use(bodyParser.json());

// Mock todo list data
let todoList: TodoItem[] = [
  { id: 1, text: 'Learn TypeScript' },
  { id: 2, text: 'Build a REST API' },
  { id: 3, text: 'Test with Postman' }
];

// Delete API endpoint
app.post('/delete', (req: Request, res: Response) => {
  const { id } = req.body;
  const index = todoList.findIndex(item => item.id === id);
  if (index !== -1) {
    todoList.splice(index, 1);
    res.status(200).json({ message: 'Item deleted successfully' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Edit API endpoint
app.post('/edit', (req: Request, res: Response) => {
  const { id, newText } = req.body;
  const todoItem = todoList.find(item => item.id === id);
  if (todoItem) {
    todoItem.text = newText;
    res.status(200).json({ message: 'Item updated successfully' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
