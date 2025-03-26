// hooks/useTodos.ts
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Todo } from "../types/type";

/**
 * カスタムフック - TODOに関する操作を集約
 *
 * このフックは、Todoリストの状態管理、追加、削除、完了状態の切り替えのロジックを提供します。
 *
 * @returns {{
 *   todos: Todo[],
 *   newTodo: string,
 *   setNewTodo: React.Dispatch<React.SetStateAction<string>>,
 *   error: string | null,
 *   addTodo: (e: FormEvent) => Promise<void>,
 *   deleteTodo: (id: number) => Promise<void>,
 *   toggleTodo: (id: number) => void,
 * }}
 */
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // ローカルかクラウドか識別するURI
  const hostUrl: string = import.meta.env.VITE_LOCAL_API_HOST

  // 初回マウント時にSpring BootのREADエンドポイントからデータ取得
  useEffect(() => {
    axios
      .get(`${hostUrl}/todos/read`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setTodos(data);
        } else if (data && Array.isArray(data.todos)) {
          setTodos(data.todos);
        } else {
          throw new Error("Unexpected API response format");
        }
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
        setError("APIリクエストに失敗しました");
      });
  }, []);

  /**
   * 新しいTodoを追加するハンドラー
   * フォームの送信イベントを処理し、入力されたTodoをサーバーに送信してリストに追加
   *
   * @param {FormEvent} e - フォームの送信イベントオブジェクト
   * @returns {Promise<void>} 非同期処理の完了を表すPromise
   */
  const addTodo = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    try {
      const response = await axios.post(`${hostUrl}/todos/create`, {
        title: newTodo,
        completed: false,
      });
      const createdTodo: Todo = response.data;
      setTodos((prev) => [...prev, createdTodo]);
      setNewTodo(""); // 追加後は入力欄をクリアする
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("TODOの追加に失敗しました");
    }
  };

  /**
   * Todoを削除するハンドラー
   * 指定されたIDのTodoをサーバーから削除し、ローカルのTodoリストからも除外
   *
   * @param {number} id - 削除対象のTodoのID
   * @returns {Promise<void>} 非同期処理の完了を表すPromise
   */
  const deleteTodo = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${hostUrl}/todos/delete/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setError(null);
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("TODOの削除に失敗しました");
    }
  };

  /**
   * Todoの完了状態を切り替えるハンドラー
   * 指定されたIDのTodoの完了状態を反転させ、ローカルのTodoリストを更新
   *
   * @param {number} id - 状態を切り替えるTodoのID
   * @returns {void}
   */
  const toggleTodo = (id: number): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return {
    todos,
    newTodo,
    setNewTodo,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
  };
};
