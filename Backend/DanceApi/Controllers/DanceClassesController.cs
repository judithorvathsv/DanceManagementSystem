using DanceApi.Data;
using DanceApi.Dtos;
using DanceApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DanceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DanceClassesController : ControllerBase
    {
        public readonly ApplicationDbContext _context;
        public DanceClassesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DanceClass>>> GetList()
        {
            var classes = await _context.Classes.ToListAsync();
            var classesDtos = classes.Select(Mapping.DanceClassMapping.ClassToDto).ToList();
            return Ok(classesDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DanceClass>> Get(Guid id)
        {
            var danceClass = await _context.Classes
                                        .Include(c => c.Lectures)
                                        .FirstOrDefaultAsync(c => c.Id == id);
            if (danceClass is null)
            {
                return NotFound();
            }
            return Ok(Mapping.DanceClassMapping.ClassToDto(danceClass));
        }

        [HttpPost]
        public async Task<IActionResult> Create(DanceClassRequest request)
        {
            var danceClass = new DanceClass()
            {
                Name = request.Name
            };

            await _context.Classes.AddAsync(danceClass);
            await _context.SaveChangesAsync();
            var classDto = Mapping.DanceClassMapping.ClassToDto(danceClass);
            return CreatedAtAction(nameof(Get), new { Id = danceClass.Id }, classDto);
        }

        [HttpPatch("{id}")]
        public ActionResult<DanceClassDto> Update(Guid id, DanceClassRequest request)
        {
            var classToUpdate = _context.Classes.FirstOrDefault(d => d.Id == id);

            if (classToUpdate is null)
            {
                return NotFound();
            }

            classToUpdate.Name = request.Name;

            _context.Classes.Update(classToUpdate);
            _context.SaveChanges();
            return Ok(Mapping.DanceClassMapping.ClassToDto(classToUpdate));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var classToDelete = _context.Classes
                                    .Include(c => c.Lectures)
                                    .FirstOrDefault(d => d.Id == id);

            if (classToDelete is null)
            {
                return NotFound();
            }

            if (classToDelete.Lectures.Any())
            {
                return BadRequest(new { message = "Cannot delete class because it has lectures. Delete lectures first." });
            }

            _context.Classes.Remove(classToDelete);
            _context.SaveChanges();
            return NoContent();
        }

    }
}