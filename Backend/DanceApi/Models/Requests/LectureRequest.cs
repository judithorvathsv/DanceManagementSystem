using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DanceApi.Models.Requests
{
    public class LectureRequest
    {
        public required string Name { get; set; }

        public required string Description { get; set; }

        public string? PreparationVideoLink { get; set; }

        public string? LectionVideoLink { get; set; }

        public required Guid DanceClassId { get; set; }
    }
}