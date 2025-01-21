import { useEffect, useState } from "react";
import { danceClassesFetch } from "../utils/danceClassFetch";
import DanceClass from "./danceClass";
import { DanceClassProp } from "../types/danceClassTypes";

const DanceClassList = () => {
  const [danceClasses, setDanceClasses] = useState<DanceClassProp[]>([]);
  const [fetchError, setFetchError] = useState<string | unknown>();

  const getDanceClasses = async () => {
    try {
      const response = await danceClassesFetch();
      if (response?.data && Array.isArray(response.data)) {
        setDanceClasses(response.data as DanceClassProp[]);
      } else {
        setDanceClasses([]);
      }
    } catch (error) {
      setFetchError(error);
    }
  };

  useEffect(() => {
    getDanceClasses();
  }, []);

  if (fetchError) {
    return <p>Error during fetching classes</p>;
  }

  if (danceClasses.length == 0) {
    return <p>No classes available</p>;
  }

  return (
    <>
      <h2>Our Classes:</h2>
      <div>
        {danceClasses.map((danceClass) => (
          <DanceClass
            key={danceClass.id}
            id={danceClass.id}
            name={danceClass.name}
          />
        ))}
      </div>
    </>
  );
};

export default DanceClassList;
