import { LectureProps } from "../types/lectureTypes";
import YoutubeEmbed from "./youtubeEmbed ";

const Lecture = ({
  lecture,
  index,
}: {
  lecture: LectureProps;
  index: number;
}) => {
  return (
    <li
      key={lecture.id}
      className="w-[95vw] max-w-8xl mx-auto bg-main rounded-lg overflow-hidden border-2 border-prim shadow-lg shadow-prim/20 mb-16"
    >
      <div className="bg-gradient-to-r from-prim to-prim-dark text-black p-6">
        <h4 className="text-xl sm:text-2xl font-bold text-center">
          Lecture {index + 1}: {lecture.name}
        </h4>
      </div>
      <div className="p-6 text-white">
        <div className="max-w-4xl mx-auto">
          <h5 className="text-lg font-semibold mb-3 text-prim">Description:</h5>
          <p className="mb-12 text-gray-300">{lecture.description}</p>

          <h5 className="text-lg font-semibold mb-3 text-prim">
            Prepare for the lecture:
          </h5>
          {lecture.preparationVideoLink ? (
            <div className="w-full mx-auto mb-14">
              <YoutubeEmbed url={lecture.preparationVideoLink} />
            </div>
          ) : (
            <p className="text-third italic mb-12">
              No preparation video available
            </p>
          )}

          <h5 className="text-lg font-semibold mb-3 text-prim">
            Video from lecture to practice:
          </h5>
          {lecture.lectionVideoLink ? (
            <div className="w-full mx-auto">
              <YoutubeEmbed url={lecture.lectionVideoLink} />
            </div>
          ) : (
            <p className="text-third italic">No lecture video available</p>
          )}
        </div>
      </div>
    </li>
  );
};

export default Lecture;
