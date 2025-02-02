using DanceApi.Models;
using DanceApi.Models.Dtos;
using DanceApi.Models.Requests;

namespace DanceApi.Mapping
{
    public static class LectureMapping
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

        public static Lecture LectureUpdateRequestToLecture(LectureUpdateRequest request, Lecture lectureToUpdate)
        {
            lectureToUpdate.Name = request.Name;
            lectureToUpdate.Description = request.Description;
            lectureToUpdate.PreparationVideoLink = request.PreparationVideoLink;
            lectureToUpdate.LectionVideoLink = request.LectionVideoLink;

            return lectureToUpdate;
        }
    }

}