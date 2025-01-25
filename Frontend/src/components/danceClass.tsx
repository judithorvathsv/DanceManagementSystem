import { DanceClassProp } from "../types/danceClassTypes";
import { deleteClass, updateClass } from "../utils/danceClassFetch";
import Button from "./Button";
import { useState } from "react";
import ErrorMessage from "./errorMessage";

const DanceClass = ({
  name,
  id,
  onClassUpdated,
  onClassDeleted,
}: DanceClassProp) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = () => {
    setIsUpdating(true);
  };

  const handleDeleteInitiate = () => {
    setIsDeleting(true);
  };

  const handleDelete = async () => {
    try {
      await deleteClass(id);
      onClassDeleted?.(name);
      setIsDeleting(false);
    } catch (error) {
      console.error("Failed to delete class", error);
      setErrorMessage(
        "Failed to delete class. It may have associated lectures."
      );
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleting(false);
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
          ) : isDeleting ? (
            <div
              className="flex flex-col items-center w-full  p-6   rounded-lg border border-third-dark
            bg-gradient-to-b from-gray-800 to-gray-900
            shadow-[0_0_10px_rgba(255,255,255,0.1),_0_0_20px_rgba(255,255,255,0.1),_0_0_30px_rgba(255,255,255,0.1)] "
            >
              <p className="mb-2 text-center text-error-dark font-semibold">
                Do you want to delete {name}?
              </p>
              <div className="flex space-x-2">
                <Button variant="error" onClick={handleDelete} className="mr-2">
                  Confirm Delete
                </Button>
                <Button variant="secondary" onClick={handleDeleteCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Button variant="primary" onClick={handleEdit}>
                Edit
              </Button>
              <Button variant="secondary" onClick={handleDeleteInitiate}>
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
