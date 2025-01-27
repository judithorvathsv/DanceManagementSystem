using DanceApi.Dtos;
using DanceApi.Models;
using DanceApi.Models.Dtos;

namespace DanceApi.Mapping
{
    public static class DanceClassMapping
    {
        public static DanceClassDto ClassToDto(DanceClass danceClass)
        {
            return new DanceClassDto()
            {
                Id = danceClass.Id,
                Name = danceClass.Name,               
                Lectures = danceClass.Lectures.Select(l => new LectureDto
                {
                    Id = l.Id,
                    Name = l.Name,
                    Description = l.Description,
                    PreparationVideoLink = l.PreparationVideoLink,
                    LectionVideoLink = l.LectionVideoLink,
                    DanceClassId = l.DanceClassId
                }).ToList()
            };
        }

        public static DanceClass DtoToClass(DanceClassDto danceClassDto)
        {
            return new DanceClass()
            {
                Id = danceClassDto.Id,
                Name = danceClassDto.Name,			
				Lectures = danceClassDto.Lectures.Select(l => new Lecture()
				{
					Id = l.Id,
					Name = l.Name,
					Description = l.Description,
					PreparationVideoLink = l.PreparationVideoLink,
					LectionVideoLink = l.LectionVideoLink,
					DanceClassId = l.DanceClassId
				}).ToList()
			};
        }
    }
}