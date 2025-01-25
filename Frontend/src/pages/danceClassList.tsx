import { useEffect, useState } from "react";
import { danceClassesFetch } from "../utils/danceClassFetch";
import DanceClass from "../components/danceClass";
import { DanceClassProp } from "../types/danceClassTypes";
import CreateDanceClass from "../components/createDanceClass";
import SuccessMessage from "../components/successMessage";

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [refreshTrigger]);

  const handleCreateClass = () => {
    setShowCreateDanceClass(!showCreateDanceClass);
    setRefreshTrigger(!refreshTrigger);
  };

  const showTempSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setRefreshTrigger(!refreshTrigger);
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
          showTempSuccessMessage(`${name} class added successfully!`)
        }
      />
    );

  const renderClassList = () => (
    <div>
      {danceClasses.map((danceClass) => (
        <div
          key={danceClass.id}
          className="hover:bg-third/10 transition-colors duration-300"
        >
          <DanceClass
            key={danceClass.id}
            id={danceClass.id}
            name={danceClass.name}
            onClassUpdated={(name) =>
              showTempSuccessMessage(`${name} class updated successfully!`)
            }
            onClassDeleted={(name) =>
              showTempSuccessMessage(`${name} class deleted successfully!`)
            }
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-black">
      <div className="container mx-auto px-4 py-12 max-w-8xl 2xl:border-x 2xl:border-third">
        <div className="flex flex-col md:flex-row items-center mb-6 ">
          {/* Mobile: under each other */}
          <div className="w-full flex flex-col items-center md:hidden">
            <h2 className="text-xl text-center font-semibold mb-4 mt-4">
              Our Classes
            </h2>
            {renderCreateClassButton()}
          </div>

          {/* Desktop, tablet: next to each other */}
          <div className="hidden md:flex md:w-full md:items-center">
            <div className="w-1/3"></div>
            <h2 className="text-xl text-center font-semibold w-1/3 mb-4 mt-4">
              Our Classes
            </h2>
            <div className="w-1/3 flex justify-end">
              {renderCreateClassButton()}
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

        {renderCreateClassForm()}

        {danceClasses.length === 0 ? (
          <p>No classes available</p>
        ) : (
          renderClassList()
        )}
      </div>
    </div>
  );
};

export default DanceClassList;
