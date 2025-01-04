// app/(dashboard)/todo/page.tsx
'use client';

import { TodoList } from '@/components/TodoList';
import { useState } from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([
    // Add some sample todos or fetch from your API
    { id: '1', title: 'Sample Todo', completed: false },
  ]);

  const handleToggle = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoList 
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
