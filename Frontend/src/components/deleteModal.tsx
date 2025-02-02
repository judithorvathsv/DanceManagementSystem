import React from "react";
import Button from "./button";

interface ModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({
  id,
  title,
  children,
  onConfirm,
  onCancel,
}) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-white text-black rounded-lg border border-error">
        <h3 className="font-bold text-lg text-error text-center">{title}</h3>
        <div className="py-4 text-center">{children}</div>
        <div className="modal-action flex justify-center space-x-2">
          <form method="dialog" className="flex justify-between w-full">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="error" onClick={onConfirm}>
              Delete
            </Button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;
