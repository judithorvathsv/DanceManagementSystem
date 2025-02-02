import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "./button";
import { LectureRequestProps, LectureUpdateProps } from "../types/lectureTypes";
import { editLecture } from "../utils/lectureFetch";

const UpdateLecture = ({
  id,
  lectureUpdateRequest,
  handleUpdateLecture,
  onLectureUpdated,
}: LectureUpdateProps) => {
  const {
    originalName,
    originalDescription,
    originalPreparationVideoLink,
    originalLectionVideoLink,
  } = lectureUpdateRequest;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LectureRequestProps>({
    defaultValues: {
      name: originalName,
      description: originalDescription,
      preparationVideoLink: originalPreparationVideoLink || "",
      lectionVideoLink: originalLectionVideoLink || "",
    },
  });

  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data: LectureRequestProps) => {
    try {
      await editLecture(data, id);
      onLectureUpdated?.(data.name!);
      handleUpdateLecture(data.name!);
    } catch (error) {
      console.error("Error saving lecture:", error);
      setSubmitError("Error saving lecture. Try again");
    }
  };

  return (
    <div className="w-full">
      {submitError && <div className="text-error mb-4">{submitError}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <label
            htmlFor="name"
            className="whitespace-nowrap sm:w-1/3 mb-1 sm:mb-0"
          >
            Name:
          </label>
          <div className="w-full sm:w-2/3">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="text-black w-full px-2 py-1 rounded"
                  type="text"
                  id="name"
                  placeholder={originalName}
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

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <label
            htmlFor="description"
            className="whitespace-nowrap sm:w-1/3 mb-1 sm:mb-0"
          >
            Description:
          </label>
          <div className="w-full sm:w-2/3">
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="text-black w-full px-2 py-1 rounded"
                  id="description"
                  placeholder={originalDescription}
                  value={field.value ?? ""}
                />
              )}
            />
            {errors.description && (
              <span className="error text-error mt-1">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <label
            htmlFor="preparationVideoLink"
            className="whitespace-nowrap sm:w-1/3 mb-1 sm:mb-0"
          >
            Preparation Video Link:
          </label>
          <div className="w-full sm:w-2/3">
            <Controller
              name="preparationVideoLink"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="text-black w-full px-2 py-1 rounded"
                  type="text"
                  id="preparationVideoLink"
                  placeholder={originalPreparationVideoLink || ""}
                  value={field.value ?? ""}
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <label
            htmlFor="lectionVideoLink"
            className="whitespace-nowrap sm:w-1/3 mb-1 sm:mb-0"
          >
            Lection Video Link:
          </label>
          <div className="w-full sm:w-2/3">
            <Controller
              name="lectionVideoLink"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="text-black w-full px-2 py-1 rounded"
                  type="text"
                  id="lectionVideoLink"
                  placeholder={originalLectionVideoLink || ""}
                  value={field.value ?? ""}
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Button variant="secondary" onClick={() => handleUpdateLecture("")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLecture;
