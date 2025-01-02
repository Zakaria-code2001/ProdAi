"use client";

import { useState } from 'react';
import Link from 'next/link';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const initialTodos: Todo[] = [
  { id: 1, title: 'Learn Next.js', completed: false, createdAt: new Date() },
  { id: 2, title: 'Build Todo App', completed: false, createdAt: new Date() },
  { id: 3, title: 'Deploy ProdAi', completed: true, createdAt: new Date() },
];

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  
  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    
    const todo: Todo = {
      id: newId,
      title: newTodo.trim(),
      completed: false,
      createdAt: new Date()
    };
    
    setTodos(prev => [...prev, todo]);
    setNewTodo('');
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen pt-4">
      <div className="w-full max-w-2xl">
        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </form>
        
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`p-3 border rounded-lg transition-colors dark:border-slate-600 ${
                todo.completed ? 'dark:bg-slate-800/50' : 'dark:bg-transparent'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <Link 
                  href={`/todo/${todo.id}`}
                  className={`flex-1 dark:text-white ${
                    todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                  }`}
                >
                  {todo.title}
                </Link>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      todo.completed 
                        ? 'border border-gray-300 dark:border-slate-600 hover:bg-slate-800 dark:text-white'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
