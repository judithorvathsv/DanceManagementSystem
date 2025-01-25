import React, { useState } from "react";
import { saveNewDanceClass } from "../utils/danceClassFetch";
import Button from "./Button";
import { CreateDanceClassProp } from "../types/danceClassTypes";

const CreateDanceClass = ({handleCreateClass, onClassCreated}:CreateDanceClassProp) => {
  const [formData, setFormData] = useState({ name: "" });
  const [errors, setErrors] = useState({ name: "" });

  const [submitError, setSubmitError] = useState("");


  const handleCancel = () => {
    handleCreateClass();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        saveNewDanceClass(formData.name);      
        onClassCreated?.(formData.name);
        handleCreateClass();
      } catch (error) {
        console.error("Error saving class:", error);
        setSubmitError("Failed to create class. Please try again.");
      }
    }
  };

  if (submitError)
    return (
      <div>
        Error loading classes:
        {typeof submitError === "string" ? submitError : "An error occurred"}
      </div>
    );

  return (
    <div
      className="mt-4 w-full max-w-sm mx-auto p-6 rounded-lg border border-third-dark
            bg-gradient-to-b from-gray-800 to-gray-900
            shadow-[0_0_10px_rgba(255,255,255,0.1),_0_0_20px_rgba(255,255,255,0.1),_0_0_30px_rgba(255,255,255,0.1)]"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="name" className="whitespace-nowrap">
            Name:
          </label>
          <div className="flex-grow">
            <input
              className="text-black w-full px-2 py-1 rounded"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <span className="error text-red-500 text-xs mt-1">
                {errors.name}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateDanceClass;
