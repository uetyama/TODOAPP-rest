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
    axios.get('http://localhost:8080/todos')
      .then(response => {
        const data = response.data;
        // レスポンスが直接配列の場合と、オブジェクト内にtodosプロパティがある場合に対応
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

  // フォーム送信時の処理
  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    try {
      // POSTリクエストで新規TODOを作成
      const response = await axios.post('http://localhost:8080/todos/create', {
        title: newTodo,
        completed: false
      });
      
      // APIから返ってきたTODOを追加
      const createdTodo: Todo = response.data;
      setTodos(prev => [...prev, createdTodo]);
      setNewTodo('');
      setError(null);
    } catch (err) {
      console.error('Error adding todo:', err);
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
      
      {/* todosが配列であることを型ガードでチェック */}
      {!Array.isArray(todos) ? (
        <p>データ形式が不正です</p>
      ) : todos.length === 0 && !error ? (
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
