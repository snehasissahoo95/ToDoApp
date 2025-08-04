import { TodoItem } from '../models/todo.model';

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function combineDateAndTime(date: string, time: string): string {
  if (!time) time = '00:00';
  const combined = new Date(`${date}T${time}`);
  return combined.toISOString();
}

export function isValidDueDateTime(date: string, time: string): boolean {
  if (!date) return false;

  const selected = new Date(`${date}T${time || '00:00'}`);
  const now = new Date();
  const minAllowed = new Date(now.getTime() - 5 * 60 * 1000);
  const maxDateTime = new Date();
  maxDateTime.setFullYear(maxDateTime.getFullYear() + 1);

  return selected >= minAllowed && selected <= maxDateTime;
}

export function groupTodosByDate(todos: TodoItem[]): [string, TodoItem[]][] {
  const grouped = new Map<string, TodoItem[]>();
  const sortedTodos = [...todos].sort((a, b) =>
    new Date(a.dueDateTime).getTime() - new Date(b.dueDateTime).getTime()
  );

  sortedTodos.forEach(todo => {
    const dateKey = new Date(todo.dueDateTime).toISOString().split('T')[0];
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)!.push(todo);
  });

  return Array.from(grouped.entries());
}
