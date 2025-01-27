import { useState, useEffect } from "react";
import { ErrorMessageProps } from "../types/messageTypes";

const ErrorMessage = ({
  message,
  duration = 2500,
  onClose,
}: ErrorMessageProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const errorText = (() => {
    if (message instanceof Error) {
      return message.message;
    } else if (typeof message === 'string') {
      return message;
    } else if (message instanceof Object) {
      return JSON.stringify(message);
    } else if (message === undefined) {
      return 'An unknown error occurred';
    } else {
      return String(message);
    }
  })();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const fadeOutTimer = setTimeout(() => {
        onClose?.();
      }, 500);

      return () => clearTimeout(fadeOutTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);


  return (
    <div className="flex justify-center w-full mt-4">
      <div className="w-full max-w-sm">
        <div
          className={`
            ${isFadingOut ? "animate-fade-out-up" : "animate-fade-in-down"} 
            text-white px-4 py-3 rounded-lg shadow-lg border border-error bg-error
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="font-semibold">{errorText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
