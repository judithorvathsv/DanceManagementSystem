import { useLocation } from "@tanstack/react-router";

const Register = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";

  const registerForm = (
    <div className="w-full max-w-xs mx-auto bg-black pt-4 rounded">
      <h2
        className={`text-xl text-center mb-4 ${isRegisterPage ? "font-semibold" : ""}`}
      >
        {isRegisterPage ? "Register" : "Join here:"}
      </h2>
      <form className="flex flex-col space-y-4 p-6">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded text-black"
        />
        <button
          type="submit"
          className="bg-prim hover:bg-prim-dark text-black font-bold py-2 px-4 rounded"
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
