// src/components/TodoList.tsx
import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../hooks/useTodos';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  if (todos.length === 0) return <p>No todos available</p>;

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
