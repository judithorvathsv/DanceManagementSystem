import { DanceClassProp } from "../types/danceClassTypes";
import { deleteClass, updateClass } from "../utils/danceClassFetch";
import Button from "./button";
import { useState } from "react";
import ErrorMessage from "./errorMessage";
import { useNavigate } from "@tanstack/react-router";
import DeleteModal from "./deleteModal";

const DanceClass = ({
  name,
  id,
  onClassUpdated,
  onClassDeleted,
}: DanceClassProp) => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    setIsUpdating(true);
  };

  const handleDeleteInitiate = () => {
    setShowDeleteModal(true);
    const modal = document.getElementById(
      `delete-modal-${id}`
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteClass(id);
      onClassDeleted?.(name);
      setShowDeleteModal(false);
      const modal = document.getElementById(
        `delete-modal-${id}`
      ) as HTMLDialogElement;
      if (showDeleteModal) {
        modal.close();
      }
    } catch (error) {
      console.error("Failed to delete class", error);
      setErrorMessage(
        "Failed to delete class. It may have associated lectures."
      );
    }
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

  const handleShowLectures = () => {
    navigate({
      to: "/detailsDanceClass",
      search: { id: id },
    });
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
                Edit Name
              </Button>
              <Button variant="secondary" onClick={handleShowLectures}>
                Lectures
              </Button>
              <Button variant="secondary" onClick={handleDeleteInitiate}>
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      <DeleteModal
        id={`delete-modal-${id}`}
        title={`Delete ${name}`}
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          const modal = document.getElementById(
            `delete-modal-${id}`
          ) as HTMLDialogElement;
          if (modal) {
            modal.close();
          }
        }}
      >
        <p>Are you sure you want to delete this class?</p>
      </DeleteModal>
    </>
  );
};

export default DanceClass;
