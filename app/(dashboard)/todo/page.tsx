'use client';

import { TodoList } from '@/components/TodoList';

export default function TodoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoList />
    </div>
  );
}
