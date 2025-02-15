// src/hooks/useTodos.ts
import { useEffect, useState } from 'react';
import api from '../services/api';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    api.get<Todo[]>('/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  return { todos, setTodos };
};

export default useTodos;
