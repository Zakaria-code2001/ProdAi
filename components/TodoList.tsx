"use client";

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
  const [suggestions, setSuggestions] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  
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
    // Clean up suggestions when todo is deleted
    setSuggestions(prev => {
      const newSuggestions = { ...prev };
      delete newSuggestions[id];
      return newSuggestions;
    });
  };

  const getSuggestions = async (todo: Todo) => {
    setLoading(prev => ({ ...prev, [todo.id]: true }));
    
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: todo.title }),
      });
      
      const data = await response.json();
      setSuggestions(prev => ({
        ...prev,
        [todo.id]: data.suggestions
      }));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(prev => ({ ...prev, [todo.id]: false }));
    }
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
        
        <Accordion type="single" collapsible>
          {todos.map((todo) => (
            <AccordionItem value={todo.id.toString()} key={todo.id}>
              <div className={`border rounded-lg transition-colors dark:border-slate-600 mb-2 ${
                todo.completed ? 'dark:bg-slate-800/50' : 'dark:bg-transparent'
              }`}>
                <div className="flex items-center justify-between p-3">
                  <AccordionTrigger 
                    className={`flex-1 hover:no-underline ${
                      todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'dark:text-white'
                    }`}
                  >
                    {todo.title}
                  </AccordionTrigger>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTodo(todo.id);
                      }}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        todo.completed 
                          ? 'border border-gray-300 dark:border-slate-600 hover:bg-slate-800 dark:text-white'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {todo.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        !loading[todo.id] && getSuggestions(todo);
                      }}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                      disabled={loading[todo.id]}
                    >
                      {loading[todo.id] ? 'Loading...' : 'Boost'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTodo(todo.id);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <AccordionContent className="px-3 pb-3">
                  <div className="dark:text-gray-400 mb-2">
                    Created: {todo.createdAt.toLocaleDateString()}
                  </div>
                  {suggestions[todo.id] && (
                    <div className="mt-3 p-3 bg-slate-800/30 rounded-lg dark:text-white">
                      <h3 className="font-semibold mb-2">AI Suggestions:</h3>
                      {suggestions[todo.id]}
                    </div>
                  )}
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
