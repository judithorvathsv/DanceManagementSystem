import React, { ReactNode } from "react";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const UpdateModal = ({
  isOpen,
  onClose,
  title,
  children,
}: UpdateModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-main p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {React.cloneElement(children as React.ReactElement, { onClose })}
      </div>
    </div>
  );
};

export default UpdateModal;
