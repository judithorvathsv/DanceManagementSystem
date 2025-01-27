using DanceApi.Models;
using DanceApi.Models.Dtos;

namespace DanceApi.Mapping
{
    public static class LectionMapping
    {
        public static LectureDto LectureToDto(Lecture lecture)
        {
            return new LectureDto()
            {
                Id = lecture.Id,
                Name = lecture.Name,
                Description = lecture.Description,
                PreparationVideoLink = lecture.PreparationVideoLink,
                LectionVideoLink = lecture.LectionVideoLink,
                DanceClassId = lecture.DanceClassId
            };
        }

        public static Lecture LectureDtoToLecture(LectureDto lectureDto)
        {
            return new Lecture()
            {
                Id = lectureDto.Id,
                Name = lectureDto.Name,
                Description = lectureDto.Description,
                PreparationVideoLink = lectureDto.PreparationVideoLink,
                LectionVideoLink = lectureDto.LectionVideoLink,
                DanceClassId = lectureDto.DanceClassId
            };
        }
    }

}