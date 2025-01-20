const Register = () => {
    return (
        <div className="w-full max-w-xs mx-auto bg-black pt-4 rounded">
          <h3 className="text-xl text-center">Join here:</h3>
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
    };
    

export default Register;
