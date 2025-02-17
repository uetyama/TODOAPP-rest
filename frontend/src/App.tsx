// src/App.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // コンポーネントの初回マウント時にAPIからTODOリストを取得
  useEffect(() => {
    axios.get<Todo[]>('http://localhost:8080/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(err => {
        console.error('Error fetching todos:', err);
        setError('APIリクエストに失敗しました');
      });
  }, []);

  // フォーム送信時の処理
  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    try {
      // POSTリクエストで新規TODOを作成
      const response = await axios.post<Todo>('http://localhost:8080/todos/create', {
        title: newTodo,
        completed: false
      });
      
      // 作成されたTODO（バックエンドから返ってくる）を状態に追加
      const createdTodo = response.data;
      setTodos([...todos, createdTodo]);
      setNewTodo('');
      setError(null);
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('TODOの追加に失敗しました');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>TODO App (Spring Boot連携)</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* 入力フォーム */}
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="New todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ marginRight: '8px' }}
        />
        <button type="submit">Add Todo</button>
      </form>
      
      <hr />
      
      {todos.length === 0 && !error ? (
        <p>No todos available.</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.title} - {todo.completed ? 'Done' : 'Pending'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
