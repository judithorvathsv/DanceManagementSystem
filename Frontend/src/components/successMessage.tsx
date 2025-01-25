// SuccessMessage.tsx
import { useState, useEffect } from "react";
import { SuccessMessageProps } from "../types/messageTypes";

const SuccessMessage = ({
  message,
  duration = 2500,
  onClose,
}: SuccessMessageProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const fadeOutTimer = setTimeout(() => {
        onClose?.();
        setIsVisible(false);
      }, 500);

      return () => clearTimeout(fadeOutTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, isVisible]);

  

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex justify-center w-full mt-4">
      <div className="w-full max-w-sm">
        <div
          className={`
            ${isFadingOut ? "animate-fade-out-up" : "animate-fade-in-down"} 
            text-white px-4 py-3 rounded-lg shadow-lg border border-success bg-success
          `}
        >
          <div className="flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="font-semibold">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
