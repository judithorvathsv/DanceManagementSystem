import { DanceClassProp } from "../types/danceClassTypes";
import { deleteClass, updateClass } from "../utils/danceClassFetch";
import Button from "./button";
import { useState } from "react";
import ErrorMessage from "./errorMessage";
import { useNavigate } from "@tanstack/react-router";
import DeleteModal from "./deleteModal";
import UpdateModal from "./updateModal";
import UpdateClass from "./updateClass";

const DanceClass = ({
  name,
  id,
  onClassUpdated,
  onClassDeleted,
}: DanceClassProp) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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

  const handleUpdate = () => {
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (updatedName: string) => {
    try {
      await updateClass(id, updatedName.trim());
      onClassUpdated?.(updatedName.trim());
      setShowUpdateModal(false);
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

  return (
    <li className="w-full mx-auto bg-main rounded-lg overflow-hidden border-2 border-prim shadow-lg shadow-prim/20 mb-6">
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => {
            setErrorMessage("");
          }}
        />
      )}

      <div className="bg-gradient-to-r from-prim to-prim-dark hover:from-prim-dark hover:to-prim p-4 transition-all duration-300 ease-in-out">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0 w-full sm:w-1/3 text-black text-center sm:text-left">
            {name}
          </h4>

          <div className="flex space-x-2 w-full sm:w-2/3 justify-center sm:justify-end">
            <Button variant="update" onClick={handleUpdate} className="text-sm">
              Update Class
            </Button>
            <Button
              variant="update"
              onClick={handleShowLectures}
              className="text-sm"
            >
              Lectures
            </Button>
            <Button
              variant="delete"
              onClick={handleDeleteInitiate}
              className="text-sm"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      <DeleteModal
        id={`delete-modal-${id}`}
        title={`Delete ${name}`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      >
        <p>Are you sure you want to delete this class?</p>
      </DeleteModal>

      <UpdateModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        title={`Update Class: ${name}`}
      >
        <UpdateClass
          initialName={name}
          onSubmit={handleUpdateSubmit}
          onCancel={() => setShowUpdateModal(false)}
        />
      </UpdateModal>
    </li>
  );
};

export default DanceClass;
