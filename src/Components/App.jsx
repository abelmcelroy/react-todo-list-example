import axios from "axios";
import React, { useState } from 'react';
import NewTodoListItemForm from './NewTodoListItemForm.jsx';
import TodoItemsList from './TodoItemsList.jsx';

export default function App() {
  const [todoItems, updateTodoItems] = useState([]);

  return (
    <>
      <button onClick={async () => {
        const resp = await axios.get('/')
        console.log(resp)
      }}>http request</button>
      <NewTodoListItemForm
        currentTodoItems={todoItems}
        updateTodoItems={updateTodoItems}
      />
      <TodoItemsList
        currentTodoItems={todoItems}
        updateTodoItems={updateTodoItems}
      />
    </>
  )
}