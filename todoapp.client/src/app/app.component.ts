import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { TodoItem } from '../models/todo.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  formatDate,
  formatTime,
  combineDateAndTime,
  isValidDueDateTime,
  groupTodosByDate
} from '../helpers/todo-helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: TodoItem[] = [];
  newTask = '';
  dueDate: string = '';
  dueTime: string = '';
  editingId: number | null = null;
  currentDate = new Date();
  minDate: string = '';
  maxDate: string = '';
  minTime: string = '00:00';
  cols = 3;
  formLayoutClass = '';
  todoLayoutClass = '';
  groupedTodos: [string, TodoItem[]][] = [];

  constructor(private todoService: TodoService, public breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
        this.cols = 1;
        this.formLayoutClass = 'form-container column';
        this.todoLayoutClass = 'todo-grid column';
      } else {
        this.cols = 3;
        this.formLayoutClass = 'form-container row';
        this.todoLayoutClass = 'todo-grid row';
      }
    });
  }

  ngOnInit() {
    this.setCurrentDateTime();

    this.minDate = this.dueDate;
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    this.maxDate = formatDate(oneYearLater);

    this.loadTodos();
  }

  setCurrentDateTime(): void {
    const now = new Date();
    this.dueDate = formatDate(now);
    this.dueTime = formatTime(now);
    this.updateMinTime();
  }

  private resetForm() {
    this.newTask = '';
    this.setCurrentDateTime();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data.sort((a, b) => new Date(a.dueDateTime).getTime() - new Date(b.dueDateTime).getTime());
      this.groupedTodos = groupTodosByDate(this.todos);
    });
  }

  addTodo() {
    if (!this.newTask.trim() || !this.dueDate) return;

    if (!isValidDueDateTime(this.dueDate, this.dueTime)) {
      alert('Please select a valid due date and time within the allowed range (not past, not beyond 1 year).');
      return;
    }

    const dueDateTime = combineDateAndTime(this.dueDate, this.dueTime);

    const newTodo = {
      task: this.newTask.trim(),
      dueDateTime,
    };

    this.todoService.addTodo(newTodo).subscribe(todo => {
      this.todos.push(todo);
      this.groupedTodos = groupTodosByDate(this.todos);
      this.resetForm();
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
      this.groupedTodos = groupTodosByDate(this.todos);
    });
  }

  deleteAllForDate(date: string): void {
    this.todoService.deleteTodosByDate(date).subscribe(() => {
      this.todos = this.todos.filter(todo => {
        const todoDate = formatDate(new Date(todo.dueDateTime));
        return todoDate !== date;
      });
      this.groupedTodos = groupTodosByDate(this.todos);
    });
  }

  editTodo(todo: TodoItem) {
    this.editingId = todo.id;
    this.newTask = todo.task;

    if (todo.dueDateTime) {
      const dt = new Date(todo.dueDateTime);
      this.dueDate = formatDate(dt);
      this.dueTime = formatTime(dt);
    } else {
      this.dueDate = '';
      this.dueTime = '';
    }
  }

  saveEdit() {
    if (!this.editingId || !this.newTask.trim() || !this.dueDate) return;

    if (!isValidDueDateTime(this.dueDate, this.dueTime)) {
      alert('Please select a valid due date and time within the allowed range (not past, not beyond 1 year).');
      return;
    }

    const dueDateTime = combineDateAndTime(this.dueDate, this.dueTime);

    const updatedTodo: TodoItem = {
      id: this.editingId,
      task: this.newTask.trim(),
      dueDateTime,
    };

    this.todoService.updateTodo(updatedTodo).subscribe(todo => {
      const index = this.todos.findIndex(t => t.id === this.editingId);
      if (index > -1) {
        this.todos[index] = todo;
      }
      this.groupedTodos = groupTodosByDate(this.todos);
      this.editingId = null;
      this.resetForm();
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.resetForm();
  }

  updateMinTime() {
    const now = new Date();
    this.minTime = this.dueDate === formatDate(now)
      ? formatTime(new Date(now.getTime() - 5 * 60 * 1000))
      : '00:00';
  }

  onDateChange() {
    this.updateMinTime();
  }
}
