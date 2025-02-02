using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DanceApi.Models.Dtos
{
    public class UserDto
    {
        public required string Name { get; set; }

        public required string Email { get; set; }

        public required string Password { get; set; }

        public required string Role { get; set; }
    }
}