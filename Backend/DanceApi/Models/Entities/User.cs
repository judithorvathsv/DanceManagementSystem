using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DanceApi.Models.Entities
{
    public class User
    {
        public Guid Id { get; set; }

        public required string Name { get; set; }

        public required string Email { get; set; }

        public required string Password { get; set; }

        public Role Role { get; set; }
    }
}