using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DanceApi.Models.Requests
{
    public class LoginRequest
    {
        public required string Email { get; set; }

        public required string Password { get; set; }
    }
}