import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import SuccessMessage from "../components/successMessage";
import { loginUser } from "../utils/userFetch";
import { setRole } from "../redux/userSlice";
import { useAppDispatch } from "../redux/hooks";
import Button from "../components/button";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" });
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (search.success === true) {
      setSuccessMessage("You registered successfully, Please login");
    }
  }, [search.success]);

  const onSubmit = async (data: { email: string; password: string }) => {
    setSubmitError("");

    try {
      const response = await loginUser(data.email, data.password);
      if (response.data.role) {
        dispatch(setRole(response.data.role));
        reset();
        navigate({ to: "/danceClassList" });
      }
      if (response.data.role == "unknown") {
        setSubmitError("Invalid credentials");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSubmitError("Invalid credentials");
      } else if (typeof error === "string") {
        setSubmitError(error);
      } else {
        setSubmitError("An unexpected error occurred. Please try again later.");
      }
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

  return (
    <div className="min-h-screen flex justify-center bg-black py-12">
      <div className="w-full max-w-xs mx-auto bg-black pt-4 rounded">
        {successMessage && (
          <SuccessMessage
            key={Date.now()}
            message={successMessage}
            onClose={() => setSuccessMessage("")}
          />
        )}

        {submitError && (
          <div className="text-error mb-4 text-center">{submitError}</div>
        )}

        <h2 className="text-xl text-center mb-4 font-semibold text-white">
          Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col space-y-4 p-6"
        >
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
                className="p-2 border rounded text-black"
                autoComplete="off"
              />
            )}
          />
          {errors.email && (
            <span className="text-error text-sm">{errors.email.message}</span>
          )}

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
                className="p-2 border rounded text-black"
              />
            )}
          />
          {errors.password && (
            <span className="text-error text-sm">
              {errors.password.message}
            </span>
          )}

          <Button type="submit" variant="primary" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
