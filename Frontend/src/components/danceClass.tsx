import { DanceClassProp } from "../types/danceClassTypes";
import { updateClass } from "../utils/danceClassFetch";
import Button from "./Button";
import { useState } from "react";
import ErrorMessage from "./errorMessage";

const DanceClass = ({ name, id, onClassUpdated }: DanceClassProp) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = () => {
    setIsUpdating(true);
  };

  const handleDelete = () => {
    console.log(`Deleting class with id: ${id}`);
  };

  const handleSave = async () => {
    if (updatedName.trim() === "") {
      setErrorMessage("Name is required.");
      return;
    }

    if (updatedName.trim() === name.trim()) {
      setIsUpdating(false);
      return;
    }

    try {
      await updateClass(id, updatedName.trim());
      setIsUpdating(false);
      onClassUpdated?.(updatedName.trim());
    } catch (error) {
      console.error("Failed to update class", error);
      setErrorMessage("Failed to update class");
    }
  };

  const handleCancel = () => {
    setUpdatedName(name);
    setIsUpdating(false);
  };

  return (
    <>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => {
            setErrorMessage("");
          }}
        />
      )}

      <div className="flex max-sm:flex-col items-center justify-between p-4 border-b border-third hover:bg-third/10 transition-colors duration-300 cursor-pointer">
        {isUpdating ? (
          <input
            type="text"
            value={updatedName}
            placeholder={name}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="border rounded px-2 py-1 mr-2 flex-grow text-black"
          />
        ) : (
          <span>{name}</span>
        )}

        <div className={`space-x-2 flex items-center max-sm:mt-2`}>
          {isUpdating ? (
            <div className="flex space-x-2 items-center">
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <Button variant="primary" onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="secondary" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DanceClass;
