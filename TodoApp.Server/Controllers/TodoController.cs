using Microsoft.AspNetCore.Mvc;
using TodoApp.Server.DTOs;
using TodoApp.Server.Models;
using TodoApp.Server.Services;

namespace TodoApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoService _todoService;

        public TodoController(TodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> Get() => Ok(_todoService.GetAll());

        [HttpPost]
        public ActionResult<TodoItem> Add([FromBody] TodoItemDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Task))
                return BadRequest("Task cannot be empty.");

            return Ok(_todoService.Add(dto.Task, dto.DueDateTime));
        }

        [HttpPut("{id}")]
        public ActionResult<TodoItem> Update(int id, [FromBody] TodoItemDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Task))
                return BadRequest("Task cannot be empty.");

            if (id != dto.Id)
                return BadRequest("Id in URL does not match Id in body.");

            var updated = _todoService.Update(id, dto.Task, dto.DueDateTime);
            if (updated == null)
                return NotFound();

            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return _todoService.Delete(id) ? NoContent() : NotFound();
        }

        [HttpDelete("by-date")]
        public ActionResult DeleteByDate([FromQuery] DateTime date)
        {
            int deleted = _todoService.DeleteByDate(date);

            if (deleted == 0)
                return NotFound($"No todos found for {date.ToShortDateString()}");

            return NoContent(); // 204 if deleted successfully
        }
    }
}
