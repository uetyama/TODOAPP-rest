// src/components/TodoItem.tsx
import React from 'react';
import { Todo } from '../hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <li>
      {todo.title} - {todo.completed ? 'Done' : 'Pending'}
    </li>
  );
};

export default TodoItem;
