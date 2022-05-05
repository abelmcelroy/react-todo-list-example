/**
 * Components:
 * - input for creating new list item
 * - list of all list items
 * - list item which includes
 *  - completedness
 *  - button to delete
 *  - label
 * State:
 * - array of list items
 *  - list items will have: labels, completedness
 */

import React, { useState } from 'react';
import NewTodoListItemForm from './NewTodoListItemForm.jsx';
import TodoItemsList from './TodoItemsList.jsx';

export default function App() {

  const [todoItems, updateTodoItems] = useState([]);

  return (
    <>
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