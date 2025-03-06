// // hooks/useTodos.ts
// import { useState, FormEvent } from 'react';
// import axios from 'axios';
// import { Todo } from '../types/type';

// export const useTodos = () => {
  
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [newTodo, setNewTodo] = useState<string>('');
//   const [error, setError] = useState<string | null>(null);

//   // 新しいTodoを追加するハンドラー
//   const addTodo = async (e: FormEvent) => {
//     e.preventDefault();
//     if (newTodo.trim() === '') return;

//     try {
//       const response = await axios.post('http://localhost:8080/todos/create', {
//         title: newTodo,
//         completed: false,
//       });
//       const createdTodo: Todo = response.data;
//       setTodos(prev => [...prev, createdTodo]);
//       setNewTodo(''); // 追加後は入力欄をクリアする
//     } catch (err) {
//       console.error('Error adding todo:', err);
//       setError('TODOの追加に失敗しました');
//     }
//   };

//   // Todoを削除するハンドラー
//   const deleteTodo = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:8080/todos/delete/${id}`);
//       setTodos(prev => prev.filter(todo => todo.id !== id));
//       setError(null);
//     } catch (err) {
//       console.error('Error deleting todo:', err);
//       setError('TODOの削除に失敗しました');
//     }
//   };

//   // Todoの完了状態を切り替えるハンドラー
//   const toggleTodo = (id: number) => {
//     setTodos(prev =>
//       prev.map(todo =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   return {
//     todos,
//     newTodo,
//     setNewTodo,
//     error,
//     addTodo,
//     deleteTodo,
//     toggleTodo,
//   };
// };
