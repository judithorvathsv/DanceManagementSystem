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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col pt-56 sm:justify-center sm:items-center z-50 items-center">
      <div className="bg-main p-6 rounded-xl max-w-2xl w-11/12 sm:w-full max-h-[60vh] border border-third-dark overflow-y-auto">
        <h2 className="text-2xl font-bold mb-12">{title}</h2>
        {React.cloneElement(children as React.ReactElement, { onClose })}
      </div>
    </div>
  );
};

export default UpdateModal;
