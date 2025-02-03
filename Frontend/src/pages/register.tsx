import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import { saveNewUser } from "../utils/userFetch";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegisterPage = location.pathname === "/register";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data: FormData) => {
    setSubmitError("");

    try {
      const response = await saveNewUser(data);
      console.log("User registered successfully:", response);
      reset();
      navigate({ to: "/login", search: { success: true } });
    } catch (err) {
      setSubmitError("Registration failed. Please try again.");
      console.error("Registration error:", err);
    }
  };

    // Needed to remove 'Admin' from input
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const clearAdminValue = () => {
      if (emailInputRef.current && emailInputRef.current.value === "Admin") {
        emailInputRef.current.value = "";
      }
    };
    clearAdminValue();
    const intervalId = setInterval(clearAdminValue, 100);
    return () => clearInterval(intervalId);
  }, []);

  
  const registerForm = (
    <div className="w-full max-w-xs mx-auto bg-black pt-4 rounded">
      {submitError && <div className="text-error mb-4">{submitError}</div>}

      <h2
        className={`text-xl text-center mb-4 ${isRegisterPage ? "font-semibold" : ""} text-white`}
      >
        {isRegisterPage ? "Register" : "Join here:"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col space-y-4 p-6"
      >
        <div>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="name"
                placeholder="Name"
                className="p-2 border rounded text-black w-full"
              />
            )}
          />
          {errors.name && (
            <span className="text-error text-sm">{errors.name.message}</span>
          )}
        </div>

        <div>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                ref={(e) => {
                  field.ref(e);
                  emailInputRef.current = e;
                }}
                type="text"
                id="email"
                placeholder="Email"
                className="p-2 border rounded text-black w-full"
                autoComplete="off"
              />
            )}
          />
          {errors.email && (
            <span className="text-error text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                id="password"
                placeholder="Password"
                className="p-2 border rounded text-black w-full"
              />
            )}
          />
          {errors.password && (
            <span className="text-error text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-prim hover:bg-prim-dark text-black font-bold py-2 px-4 rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
  );

  if (isRegisterPage) {
    return (
      <div className="min-h-screen flex justify-center bg-black py-12">
        {registerForm}
      </div>
    );
  }

  return registerForm;
};

export default Register;
