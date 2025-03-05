// src/components/TodoItem.tsx
import React from 'react';
import { TodoItemProps } from '../types/type';

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <li>
      {todo.title} - {todo.completed ? 'Done' : 'Pending'}
    </li>
  );
};

export default TodoItem;
