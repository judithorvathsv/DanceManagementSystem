import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { saveNewDanceClass } from "../utils/danceClassFetch";
import Button from "./button";
import {
  CreateDanceClassNameProp,
  CreateDanceClassProp,
} from "../types/danceClassTypes";

const CreateDanceClass = ({
  handleCreateClass,
  onClassCreated,
}: CreateDanceClassProp) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDanceClassNameProp>({
    defaultValues: {
      name: "",
    },
  });

  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data: CreateDanceClassNameProp) => {
    try {
      await saveNewDanceClass(data.name);
      onClassCreated?.(data.name);
      handleCreateClass();
    } catch (error) {
      console.error("Error saving class:", error);
      setSubmitError("Error saving class. Try again");
    }
  };

  const handleCancel = () => {
    handleCreateClass();
  };

  return (
    <div
      className="m-4 mt-0 mb-8 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-w-2xl mx-auto p-6 rounded-lg border border-third-dark
            bg-gradient-to-b from-gray-800 to-gray-900
            shadow-[0_0_10px_rgba(255,255,255,0.1),_0_0_20px_rgba(255,255,255,0.1),_0_0_30px_rgba(255,255,255,0.1)]"
    >
      {submitError && <div className="text-error mb-4">{submitError}</div>}

      <h2 className="text-2xl font-bold mb-6 text-center">Create New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="name" className="whitespace-nowrap sm:w-1/3 mb-1 sm:mb-0 flex justify-start">
            Name:
          </label>
          <div className="flex-grow">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="text-black w-full px-2 py-1 rounded mb-4"
                  type="text"
                  id="name"
                />
              )}
            />
            {errors.name && (
              <span className="error text-error">{errors.name.message}</span>
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
