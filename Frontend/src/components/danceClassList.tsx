import { useEffect, useState } from "react";
import { danceClassesFetch } from "../utils/danceClassFetch";
import DanceClass from "./danceClass";
import { DanceClassProp } from "../types/danceClassTypes";
import CreateDanceClass from "./createDanceClass";
import SuccessMessage from "./successMessage";

const DanceClassList = () => {
  const [danceClasses, setDanceClasses] = useState<DanceClassProp[]>([]);
  const [fetchError, setFetchError] = useState<string | unknown>();
  const [showCreateDanceClass, setShowCreateDanceClass] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
  }, [refreshTrigger]);

  const handleCreateClass = () => {
    setShowCreateDanceClass(!showCreateDanceClass);
    setRefreshTrigger(!refreshTrigger);
  };

  const showTempCreatedMessage = (message: string) => {
    setSuccessMessage(message);
  };

  if (fetchError) {
    return <p>Error during fetching classes</p>;
  }

  const renderCreateClassButton = () =>
    !showCreateDanceClass && (
      <button
        className="bg-prim hover:bg-prim-dark text-black font-bold py-2 px-4 rounded"
        onClick={handleCreateClass}
      >
        Create a new class
      </button>
    );

  const renderCreateClassForm = () =>
    showCreateDanceClass && (
      <CreateDanceClass
        handleCreateClass={handleCreateClass}
        onClassCreated={(name) =>
          showTempCreatedMessage(`${name} class added successfully!`)
        }
      />
    );

  const renderClassList = () => (
    <div>
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
    </div>
  );

  return (
    <div className="flex flex-col">
      {renderCreateClassButton()}
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => {
            setSuccessMessage("");
          }}
        />
      )}
      {renderCreateClassForm()}
      {danceClasses.length === 0 ? (
        <p>No classes available</p>
      ) : (
        renderClassList()
      )}
    </div>
  );
};

export default DanceClassList;
