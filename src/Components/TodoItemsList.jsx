import React from 'react';

export default function TodoItemsList(props) {
  const {
    currentTodoItems,
    updateTodoItems
  } = props;

  const deleteItemAtIndex = (index) => () => {
    updateTodoItems(currentTodoItems.filter((_, i) => {
      return index !== i;
    }))
  }

  const completeItemAtIndex = (index) => () => {
    updateTodoItems(currentTodoItems.map((item, i) => {
      if (i !== index) return item;
      else return {
        label: item.label,
        completed: !item.completed,
      };
    }))
  }

  return currentTodoItems.map((todoItem, index) => (
    <div>
      <div>{todoItem.label}</div>

      <div>
        <input
          type={"checkbox"}
          onChange={completeItemAtIndex(index)}
        />
        <div>{todoItem.completed.toString()}</div>
      </div>

      <button onClick={deleteItemAtIndex(index)}>REMOVE</button>
    </div>
  ))
}