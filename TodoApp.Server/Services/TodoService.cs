using System.Collections.Concurrent;
using TodoApp.Server.Models;

namespace TodoApp.Server.Services
{
    public class TodoService
    {
        private readonly ConcurrentDictionary<int, TodoItem> _todos = new();
        private int _idCounter = 0;
        private readonly int _defaultItemId;

        public TodoService() {}

        public IEnumerable<TodoItem> GetAll() => _todos.Values;

        public TodoItem Add(string task, DateTime dueDateTime)
        {
            var id = Interlocked.Increment(ref _idCounter);
            var todo = new TodoItem { Id = id, Task = task, DueDateTime = dueDateTime };
            _todos.TryAdd(id, todo);
            return todo;
        }

        public TodoItem? Update(int id, string task, DateTime dueDateTime)
        {
            if (!_todos.TryGetValue(id, out var existing))
                return null;

            var updatedTodo = new TodoItem
            {
                Id = id,
                Task = task,
                DueDateTime = dueDateTime
            };

            _todos[id] = updatedTodo;
            return updatedTodo;
        }

        public bool Delete(int id)
        {
            return _todos.TryRemove(id, out _);
        }

        public int DeleteByDate(DateTime date)
        {
            var keysToDelete = _todos.Values
                .Where(todo => todo.DueDateTime.Date == date.Date)
                .Select(todo => todo.Id)
                .ToList();

            int deletedCount = 0;
            foreach (var id in keysToDelete)
            {
                if (_todos.TryRemove(id, out _))
                    deletedCount++;
            }

            return deletedCount;
        }
    }
}
