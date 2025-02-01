import { useState } from "react";
import { LectureDetailProps } from "../types/lectureTypes";
import { deleteLecture } from "../utils/lectureFetch";
import DeleteModal from "./deleteModal";
import YoutubeEmbed from "./YoutubeEmbed ";

const Lecture = ({
  lecture,
  index,
  handleDeleteLecture,
}: LectureDetailProps) => {
  const [submitError, setSubmitError] = useState("");

  const openDeleteModal = () => {
    const modal = document.getElementById(
      `delete_modal_${lecture.id}`
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLecture(lecture.id!);
      handleDeleteLecture(lecture.name!);
    } catch (error) {
      console.error("Error deleting lecture:", error);
      setSubmitError("Error deleting lecture. Try again");
    }
  };

  return (
    <li
      key={lecture.id}
      className="w-[95vw] max-w-8xl mx-auto bg-main rounded-lg overflow-hidden border-2 border-prim shadow-lg shadow-prim/20 mb-16"
    >
      <div className="bg-gradient-to-r from-prim to-prim-dark text-black p-6">
        {submitError && <div className="text-error mb-4">{submitError}</div>}

        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="w-full sm:w-1/4"></div>
          <h4 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-0 w-full sm:w-1/2">
            Lecture {index + 1}: {lecture.name}
          </h4>
          <div className="flex space-x-2 w-full sm:w-1/4 justify-center sm:justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
              Edit
            </button>
            <button
              onClick={openDeleteModal}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>
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

      <DeleteModal
        id={`delete_modal_${lecture.id}`}
        title={`Delete ${lecture.name}`}
        onConfirm={handleDelete}
        onCancel={() => {
          const modal = document.getElementById(
            `delete_modal_${lecture.id}`
          ) as HTMLDialogElement;
          if (modal) {
            modal.close();
          }
        }}
      >
        <p>Are you sure you want to delete this lecture?</p>
      </DeleteModal>
    </li>
  );
};

export default Lecture;
