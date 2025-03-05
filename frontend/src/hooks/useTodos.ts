// src/hooks/useTodos.ts
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Todo } from '../types/type';


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
