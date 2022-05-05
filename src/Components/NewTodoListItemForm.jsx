import React, { useState, useEffect } from 'react';

export default function NewTodoListItemForm(props) {
  const {
    updateTodoItems,
    currentTodoItems
  } = props;

  const [usersInput, updateUsersInput] = useState('');
  const [counter, updateCounter] = useState(0);

  useEffect(() => {
    updateCounter(currentTodoItems.length)
  }, [currentTodoItems]);

  const inputOnChange = (event) => {
    updateUsersInput(event.target.value);
  }
  
  const onSubmit = (event) => {
    event.preventDefault();
    const newTodoListItem = {
      label: usersInput,
      completed: false,
    };
    updateTodoItems(currentTodoItems.concat(newTodoListItem));
    updateUsersInput('');
  }

  return (
    <div>
      <div>{counter}</div>
      <input
        onChange={inputOnChange}
        value={usersInput}
      />
      <button
        onClick={onSubmit}
      >
        SUBMIT
      </button>
    </div>
  )
}