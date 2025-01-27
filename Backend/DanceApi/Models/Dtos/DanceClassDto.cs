using DanceApi.Models;

namespace DanceApi.Dtos
{
    public class DanceClassDto
    {
        public Guid Id { get; set; }

        public required string Name { get; set; }

        public List<Lecture> Lectures { get; set; } = [];
    }
}