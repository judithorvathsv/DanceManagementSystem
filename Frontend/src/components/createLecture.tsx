import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "./button";
import { CreateLectureProp, LectureRequestProps } from "../types/lectureTypes";
import { saveNewLecture } from "../utils/lectureFetch";

const CreateLecture = ({
  danceClassId,
  handleCreateLecture,
  onLectureCreated,
}: CreateLectureProp) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LectureRequestProps>({
    defaultValues: {
      name: "",
      description: "",
      preparationVideoLink: "",
      lectionVideoLink: "",
      danceClassId: danceClassId,
    },
  });

  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data: LectureRequestProps) => {
    try {
      await saveNewLecture(data);
      onLectureCreated?.(data.name!);
      handleCreateLecture();
    } catch (error) {
      console.error("Error saving lecture:", error);
      setSubmitError("Error saving lecture. Try again");
    }
  };

  const handleCancel = () => {
    handleCreateLecture();
  };

  const formFields: Array<{
    key: keyof LectureRequestProps;
    label: string;
    type: "input" | "textarea";
  }> = [
    { key: "name", label: "Name", type: "input" },
    { key: "description", label: "Description", type: "textarea" },
    {
      key: "preparationVideoLink",
      label: "Preparation Video Link",
      type: "input",
    },
    { key: "lectionVideoLink", label: "Lection Video Link", type: "input" },
  ];

  return (
    <div
      className="m-4 mt-2 sm:mt-0 mb-8 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-w-2xl mx-auto p-6 rounded-lg border border-third-dark
            bg-gradient-to-b from-gray-800 to-gray-900
            shadow-[0_0_10px_rgba(255,255,255,0.1),_0_0_20px_rgba(255,255,255,0.1),_0_0_30px_rgba(255,255,255,0.1)]"
    >
      {submitError && <div className="text-error mb-4">{submitError}</div>}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create New Lecture
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map(({ key, label, type }) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row sm:items-center sm:space-x-2"
          >
            <label
              htmlFor={key}
              className="whitespace-nowrap sm:w-1/3 mb-1 sm:mb-0 flex justify-start"
            >
              {label}:
            </label>
            <div className="w-full sm:w-2/3">
              <Controller
                name={key}
                control={control}
                rules={{
                  required:
                    key === "name" || key === "description"
                      ? `${label} is required`
                      : false,
                }}
                render={({ field }) =>
                  type === "textarea" ? (
                    <textarea
                      {...field}
                      className="text-black w-full px-2 py-1 rounded"
                      id={key}
                      value={field.value ?? ""}
                    />
                  ) : (
                    <input
                      {...field}
                      className="text-black w-full px-2 py-1 rounded"
                      type="text"
                      id={key}
                      value={field.value ?? ""}
                    />
                  )
                }
              />
              {errors[key] && (
                <span className="error text-error mt-1">
                  {errors[key]?.message}
                </span>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-4 pt-4">
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

export default CreateLecture;
