using DanceApi.Data;
using DanceApi.Models.Dtos;
using DanceApi.Models.Entities;
using DanceApi.Models.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DanceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        public readonly ApplicationDbContext _context;
        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserRequest request)
        {
            var user = new User()
            {
                Name = request.Name,
                Email = request.Email,
                Password = request.Password,
                Role = Models.Role.User
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            var userDto = Mapping.UserMapping.UserToUserDto(user);
            return CreatedAtAction(nameof(Login), new { email = user.Email, password = user.Password }, userDto);
        }


        [HttpGet("login")]
        public async Task<ActionResult<LoginDto>> Login([FromQuery] string email, [FromQuery] string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
            if (user is null)
            {
                return NotFound("Invalid credentials");
            }

            var loginDto = new LoginDto
            {
                Role = user.Role.ToString()
            };

            return Ok(loginDto);
        }

    }
}