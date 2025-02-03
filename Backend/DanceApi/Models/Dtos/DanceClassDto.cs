using DanceApi.Models.Dtos;

namespace DanceApi.Dtos
{
	public class DanceClassDto
    {
        public Guid Id { get; set; }

        public required string Name { get; set; }

        public List<LectureDto> Lectures { get; set; } = [];
    }
}