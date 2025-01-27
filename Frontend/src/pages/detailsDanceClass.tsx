import { useEffect, useState } from "react";
import {  useSearch } from "@tanstack/react-router"; // Ensure you're using TanStack Router's `useParams`
import { getOneDanceClassFetch } from "../utils/danceClassFetch";
import { components } from "../lib/api/v1";

// interface Lection {
//   name: string;
//   description: string;
// }

const DetailsDanceClass = () => {
  console.log('1')
  const search = useSearch({ from: '/detailsDanceClass' })
  const id = search.id as string;
  const [danceClass, setDanceClass] = useState<components["schemas"]["DanceClass"]>();

  console.log('Raw ID:', id);
console.log('ID Type:', typeof id);




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
    <div className="bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-4">{danceClass.name}</h2>
      <h3 className="text-2xl mb-2">Lections</h3>
      {danceClass.lectures && danceClass.lectures.length > 0 ? (
        <ul>
          {/* {danceClass.lectures.map((lecture: Lecture, index: number) => (
            <li key={index} className="mb-4">
              <h4 className="text-xl font-semibold">{lecture.name}</h4>
              <p>{lecture.description}</p>
            </li>
          ))} */}
        </ul>
      ) : (
        <p>No lections available for this class.</p>
      )}
    </div>
  );
};

export default DetailsDanceClass;
