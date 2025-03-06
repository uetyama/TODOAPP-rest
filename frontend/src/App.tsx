import React from 'react';
import { useTodos } from './hooks/useTodos';
import {
  containerStyle,
  headerStyle,
  formStyle,
  inputStyle,
  buttonStyle,
  todoItemStyle,
  todoTitleStyle,
  deleteButtonStyle
} from './styles/todoStyle';

const App: React.FC = () => {
  const {
    todos,
    newTodo,
    setNewTodo,
    error,
    addTodo,
    deleteTodo,
    toggleTodo
  } = useTodos();
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>TODO App</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 入力フォーム */}
      <form onSubmit={addTodo} style={formStyle}>
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
                onClick={() => deleteTodo(todo.id)}
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
