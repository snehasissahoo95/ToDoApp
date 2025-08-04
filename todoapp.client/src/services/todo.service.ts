import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoItem } from '../models/todo.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly baseUrl = '/api/todo';
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  // GET all todos
  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.baseUrl);
  }

  // POST a new todo
  addTodo(newTodo: Omit<TodoItem, 'id'>): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.baseUrl, newTodo, this.httpOptions);
  }

  // DELETE a todo by id
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteTodosByDate(date: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/by-date?date=${date}`);
  }

  // PUT to update a todo
  updateTodo(updatedTodo: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(
      `${this.baseUrl}/${updatedTodo.id}`,
      updatedTodo,
      this.httpOptions
    );
  }
}
