import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { getOneDanceClassFetch } from "../utils/danceClassFetch";
import { components } from "../lib/api/v1";
import { LectureProps } from "../types/lectureTypes";
import Lecture from "../components/lecture";
import CreateLecture from "../components/createLecture";
import SuccessMessage from "../components/successMessage";
import { useAppSelector } from "../context/hooks";

const DetailsDanceClass = () => {
  const search = useSearch({ from: "/detailsDanceClass" });
  const id = search.id as string;
  const [danceClass, setDanceClass] =
    useState<components["schemas"]["DanceClass"]>();

  const [showCreateLecture, setShowCreateLecture] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const userRole = useAppSelector((state) => state.user.role);

  useEffect(() => {
    const fetchDanceClassDetails = async () => {
      try {
        const response = await getOneDanceClassFetch(id);
        if (response?.data) {
          setDanceClass(response.data);
        }
      } catch (error) {
        console.error("Error fetching dance class details:", error);
      }
    };

    fetchDanceClassDetails();
  }, [id, fetchTrigger]);

  useEffect(() => {
    if (successMessage) {
      window.scrollTo(0, 0);
    }
  }, [successMessage]);

  const handleCreateLecture = () => {
    setShowCreateLecture(!showCreateLecture);
    setFetchTrigger(!fetchTrigger);
  };

  const handleDeleteLecture = (lectureName: string) => {
    setFetchTrigger(!fetchTrigger);
    showTempSuccessMessage(`${lectureName} lecture deleted successfully.`);
  };

  const handleUpdateLecture = (lectureName: string) => {
    setFetchTrigger(!fetchTrigger);
    showTempSuccessMessage(`${lectureName} lecture updated successfully.`);
  };

  const renderCreateLectureButton = () =>
    !showCreateLecture && (
      <button
        className="bg-prim-dark hover:bg-prim text-black font-bold py-2 px-4 mt-8 sm:mt-0 rounded"
        onClick={handleCreateLecture}
      >
        Create a new lecture
      </button>
    );

  const showTempSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setRefreshTrigger(!refreshTrigger);
  };

  const renderCreateLectureForm = () =>
    showCreateLecture && (
      <CreateLecture
        danceClassId={id}
        handleCreateLecture={handleCreateLecture}
        onLectureCreated={(name) =>
          showTempSuccessMessage(`${name} lecture added successfully!`)
        }
      />
    );

  if (!danceClass) {
    return <p>Error fetching the class, try again</p>;
  }

  return (
    <div className="bg-black p-8 items-center flex flex-col text-center min-h-screen">
      <h2 className="text-3xl font-bold mb-8">{danceClass.name}</h2>

      <div className="w-full max-w-8xl">
        {/* Mobile: under each other */}
        <div className="flex flex-col items-center md:hidden mb-6 sm:mb-12">
          <h3 className="text-2xl">All Lectures</h3>
          {userRole == "Admin" && renderCreateLectureButton()}
        </div>

        {/* Desktop, tablet: next to each other */}
        <div className="hidden md:flex md:items-center md:justify-between mb-6 sm:mb-12">
          <div className="w-1/3"></div>
          <h3 className="text-2xl text-center w-1/3">All Lectures</h3>
          <div className="w-1/3 flex justify-end">
            {userRole == "Admin" && renderCreateLectureButton()}
          </div>
        </div>
      </div>

      {successMessage && (
        <SuccessMessage
          key={Date.now()}
          message={successMessage}
          onClose={() => {
            setSuccessMessage("");
          }}
        />
      )}

      {renderCreateLectureForm()}

      {danceClass.lectures && danceClass.lectures.length > 0 ? (
        <ul className="space-y-6">
          {danceClass.lectures.map((lecture: LectureProps, index: number) => (
            <Lecture
              lecture={lecture}
              index={index}
              handleDeleteLecture={handleDeleteLecture}
              handleUpdateLecture={handleUpdateLecture}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 italic">
          No lectures available for this class.
        </p>
      )}
    </div>
  );
};

export default DetailsDanceClass;
