import  { FormEvent, useState } from 'react';
import { useLocation,  } from "@tanstack/react-router";
import { saveNewUser } from '../utils/userFetch';


const Register = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const isRegisterPage = location.pathname === "/register";

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await saveNewUser({ name, email, password });
      console.log('User registered successfully:', response);
      // navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  const registerForm = (
    <div className="w-full max-w-xs mx-auto bg-black pt-4 rounded">
      <h2
        className={`text-xl text-center mb-4 ${isRegisterPage ? "font-semibold" : ""}`}
      >
        {isRegisterPage ? "Register" : "Join here:"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded text-black"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded text-black"
          required
        />
        <button
          type="submit"
          className="bg-prim hover:bg-prim-dark text-black font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
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

