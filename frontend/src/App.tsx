import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { Todo } from './types/type';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // 初回マウント時にSpring BootのREADエンドポイントからデータ取得
  useEffect(() => {
    axios.get('http://localhost:8080/todos/read')
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          setTodos(data);
        } else if (data && Array.isArray(data.todos)) {
          setTodos(data.todos);
        } else {
          throw new Error('Unexpected API response format');
        }
      })
      .catch(err => {
        console.error('Error fetching todos:', err);
        setError('APIリクエストに失敗しました');
      });
  }, []);

  // 新規Todo追加
  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:8080/todos/create', {
        title: newTodo,
        completed: false
      });
      const createdTodo: Todo = response.data;
      setTodos(prev => [...prev, createdTodo]); // 新しいTodoを追加
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('TODOの追加に失敗しました');
    }
  };

  // Todoの削除処理
  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/todos/delete/${id}`);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('TODOの削除に失敗しました');
    }
  };

  // チェックボックス切り替え（状態管理のみ）
  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 簡単なモダンスタイル
  const containerStyle: React.CSSProperties = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#333'
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    marginBottom: '20px'
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '10px'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    background: '#007bff',
    color: '#fff',
    cursor: 'pointer'
  };

  const todoItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee'
  };

  const todoTitleStyle: React.CSSProperties = {
    flex: 1,
    marginLeft: '10px'
  };

  const deleteButtonStyle: React.CSSProperties = {
    marginLeft: '10px',
    padding: '5px 10px',
    background: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>TODO App</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 入力フォーム */}
      <form onSubmit={handleAddTodo} style={formStyle}>
        <input
          type="text"
          placeholder="New todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Add Todo</button>
      </form>

      {/* Todoリスト */}
      {!Array.isArray(todos) ? (
        <p>データ形式が不正です</p>
      ) : todos.length === 0 && !error ? (
        <p>No todos available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li key={todo.id} style={todoItemStyle}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span style={{
                ...todoTitleStyle,
                textDecoration: todo.completed ? 'line-through' : 'none' // 取り消し線
              }}>
                {todo.title}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                style={deleteButtonStyle}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
