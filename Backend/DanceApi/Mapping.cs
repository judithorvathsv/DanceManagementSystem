using DanceApi.Dtos;
using DanceApi.Models;

namespace DanceApi
{
    public static class Mapping
    {
        public static DanceClassDto ClassToDto(DanceClass danceClass)
        {
            return new DanceClassDto()
            {
                Id = danceClass.Id,
                Name = danceClass.Name,
                Lections = danceClass.Lections
            };
        }

        public static DanceClass DtoToClass(DanceClassDto danceClassDto)
        {
            return new DanceClass()
            {
                Id = danceClassDto.Id,
                Name = danceClassDto.Name,
                Lections = danceClassDto.Lections
            };
        }
    }
}