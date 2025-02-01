using DanceApi.Data;
using DanceApi.Models;
using DanceApi.Models.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DanceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LecturesController : ControllerBase
    {
        public readonly ApplicationDbContext _context;
        public LecturesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lecture>> Get(Guid id)
        {
            var lecture = await _context.Lectures
                                        .FirstOrDefaultAsync(c => c.Id == id);
            if (lecture is null)
            {
                return NotFound();
            }
            return Ok(Mapping.LectionMapping.LectureToDto(lecture));
        }


        [HttpPost]
        public async Task<IActionResult> Create(LectureRequest request)
        {
            var lecture = new Lecture()
            {
                Name = request.Name,
                Description = request.Description,
                PreparationVideoLink = request.PreparationVideoLink,
                LectionVideoLink = request.LectionVideoLink,
                DanceClassId = request.DanceClassId
            };

            await _context.Lectures.AddAsync(lecture);
            await _context.SaveChangesAsync();
            var lectureDto = Mapping.LectionMapping.LectureToDto(lecture);
            return CreatedAtAction(nameof(Get), new { Id = lecture.Id }, lectureDto);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var lectureToDelete = _context.Lectures.FirstOrDefault(d => d.Id == id);

            if (lectureToDelete is null)
            {
                return NotFound();
            }

            _context.Lectures.Remove(lectureToDelete);
            _context.SaveChanges();
            return NoContent();
        }
    }
}