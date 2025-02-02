import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "./button";

interface UpdateClassFormProps {
  initialName: string;
  onSubmit: (updatedName: string) => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
}

const UpdateClass: React.FC<UpdateClassFormProps> = ({
  initialName,
  onSubmit,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: initialName,
    },
  });

  const [submitError, setSubmitError] = useState("");

  const onFormSubmit = async (data: FormData) => {
    try {
      onSubmit(data.name);
    } catch (error) {
      console.error("Error updating class:", error);
      setSubmitError("Error updating class. Try again");
    }
  };

  return (
    <div className="w-full">
      {submitError && <div className="text-error mb-4">{submitError}</div>}
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <label
            htmlFor="name"
            className="whitespace-nowrap sm:w-1/3 mb-1 sm:mb-0"
          >
            Class Name:
          </label>
          <div className="w-full sm:w-2/3">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Class name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="text-black w-full px-2 py-1 rounded"
                  type="text"
                  id="name"
                  placeholder={initialName}
                  value={field.value ?? ""}
                />
              )}
            />
            {errors.name && (
              <span className="error text-error mt-1">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClass;
