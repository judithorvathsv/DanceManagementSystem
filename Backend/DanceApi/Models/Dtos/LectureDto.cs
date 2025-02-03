namespace DanceApi.Models.Dtos
{
	public class LectureDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }

        public required string Description { get; set; }

        public string? PreparationVideoLink { get; set; }

        public string? LectionVideoLink { get; set; }

        public required Guid DanceClassId { get; set; }   
    }
}