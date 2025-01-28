import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { getOneDanceClassFetch } from "../utils/danceClassFetch";
import { components } from "../lib/api/v1";
import { LectureProps } from "../types/lectureTypes";
import Lecture from "../components/lecture";

const DetailsDanceClass = () => {
  const search = useSearch({ from: "/detailsDanceClass" });
  const id = search.id as string;
  const [danceClass, setDanceClass] =
    useState<components["schemas"]["DanceClass"]>();

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
  }, [id]);

  if (!danceClass) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-black p-8 items-center flex flex-col text-center min-h-screen">
      <h2 className="text-3xl font-bold mb-8">{danceClass.name}</h2>
      <h3 className="text-2xl mb-8">All Lectures</h3>
      {danceClass.lectures && danceClass.lectures.length > 0 ? (
        <ul className="space-y-6">
          {danceClass.lectures.map((lecture: LectureProps, index: number) => (
            <Lecture lecture={lecture} index={index} />
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
