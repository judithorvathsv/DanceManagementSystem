using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DanceApi.Data;
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
            return Ok(await _context.Classes.ToListAsync());
        }






    }
}