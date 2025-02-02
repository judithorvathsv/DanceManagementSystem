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
    setTimeout(() => setSuccessMessage(""), 2500);
  };

  if (fetchError) {
    return <p>Error during fetching classes</p>;
  }

  const renderCreateClassButton = () =>
    !showCreateDanceClass && (
      <button
        className="bg-prim-dark hover:bg-prim text-black font-bold py-2 px-4 mt-8 md:mt-2 rounded"
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

  return (
    <div className="bg-black p-8 items-center flex flex-col text-center min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Our Classes</h2>

      <div className="bg-main p-4 md:p-12 w-[110%] md:w-full max-w-8xl border border-prim rounded-lg mt-4">
        <div className="w-full max-w-8xl">
          {!showCreateDanceClass && (
            <>
              {/* Mobile: under each other */}
              <div className="flex flex-col items-center md:hidden mb-12">
                {renderCreateClassButton()}
              </div>

              {/* Desktop, tablet: next to each other */}
              <div className="hidden md:flex md:items-center md:justify-between mb-12">
                <div className="w-1/3"></div>
                <div className="w-1/3 flex justify-end">
                  {renderCreateClassButton()}
                </div>
              </div>
            </>
          )}
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
          <p className="text-center text-gray-500 italic">
            No classes available
          </p>
        ) : (
          <ul className="space-y-6 w-full max-w-8xl px-2 sm:px-4 md:px-0 ">
            {danceClasses.map((danceClass) => (
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
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DanceClassList;
