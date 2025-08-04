using NUnit.Framework;
using TodoApp.Server.Services;

namespace TodoApp.Tests
{
    [TestFixture]
    public class TodoServiceTests
    {
        private TodoService _service;

        [SetUp]
        public void SetUp()
        {
            _service = new TodoService();
        }

        [Test]
        public void Add_ShouldAddTodoItem()
        {
            var task = "Test task";
            var dueDate = DateTime.Now.AddDays(1);

            var todo = _service.Add(task, dueDate);

            Assert.NotNull(todo);
            Assert.AreEqual(task, todo.Task);
            Assert.AreEqual(dueDate, todo.DueDateTime);
            Assert.IsTrue(todo.Id > 0);
        }

        [Test]
        public void GetAll_ShouldReturnAllTodos()
        {
            _service.Add("Task 1", DateTime.Now);
            _service.Add("Task 2", DateTime.Now.AddDays(1));

            var allTodos = _service.GetAll().ToList();

            Assert.AreEqual(2, allTodos.Count);
        }

        [Test]
        public void Update_ShouldModifyExistingTodo()
        {
            var original = _service.Add("Original task", DateTime.Now);

            var updated = _service.Update(original.Id, "Updated task", DateTime.Now.AddDays(2));

            Assert.NotNull(updated);
            Assert.AreEqual(original.Id, updated.Id);
            Assert.AreEqual("Updated task", updated.Task);
        }

        [Test]
        public void Update_NonExistentId_ShouldReturnNull()
        {
            var result = _service.Update(999, "Does not exist", DateTime.Now);

            Assert.IsNull(result);
        }

        [Test]
        public void Delete_ShouldRemoveItem()
        {
            var item = _service.Add("Task to delete", DateTime.Now);

            var deleted = _service.Delete(item.Id);
            var allTodos = _service.GetAll().ToList();

            Assert.IsTrue(deleted);
            Assert.IsFalse(allTodos.Any(x => x.Id == item.Id));
        }

        [Test]
        public void Delete_NonExistentId_ShouldReturnFalse()
        {
            var result = _service.Delete(12345);

            Assert.IsFalse(result);
        }

        [Test]
        public void DeleteByDate_ShouldRemoveItemsWithMatchingDate()
        {
            var dateToDelete = new DateTime(2025, 8, 5);
            _service.Add("Match 1", dateToDelete);
            _service.Add("Match 2", dateToDelete);
            _service.Add("No match", new DateTime(2025, 8, 6));

            var countDeleted = _service.DeleteByDate(dateToDelete);

            Assert.AreEqual(2, countDeleted);
            Assert.AreEqual(1, _service.GetAll().Count());
        }

        [Test]
        public void DeleteByDate_NoMatch_ShouldReturnZero()
        {
            _service.Add("Some task", new DateTime(2025, 8, 10));

            var deleted = _service.DeleteByDate(new DateTime(2025, 8, 1));

            Assert.AreEqual(0, deleted);
        }
    }
}