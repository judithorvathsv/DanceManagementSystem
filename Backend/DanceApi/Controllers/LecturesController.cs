using DanceApi.Data;
using DanceApi.Models;
using DanceApi.Models.Dtos;
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
            return Ok(Mapping.LectureMapping.LectureToDto(lecture));
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
            var lectureDto = Mapping.LectureMapping.LectureToDto(lecture);
            return CreatedAtAction(nameof(Get), new { Id = lecture.Id }, lectureDto);
        }

        [HttpPatch("{id}")]
        public ActionResult<LectureDto> Update(Guid id, LectureUpdateRequest request)
        {
            var lectureToUpdate = _context.Lectures.FirstOrDefault(d => d.Id == id);

            if (lectureToUpdate is null)
            {
                return NotFound();
            }

            var lectureToUpdateWithNewDetails = Mapping.LectureMapping.LectureUpdateRequestToLecture(request, lectureToUpdate);

            _context.Lectures.Update(lectureToUpdateWithNewDetails);
            _context.SaveChanges();
            return Ok(Mapping.LectureMapping.LectureToDto(lectureToUpdateWithNewDetails));
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