export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoItemProps {
  todo: Todo;
}

export interface TodoListProps {
  todos: Todo[];
}

