
const Login = () => {
  return (
      <div className='min-h-screen flex justify-center'>    
          <div className="w-full max-w-8xl mx-auto bg-black pt-4 rounded">
              <div className="flex justify-center items-center">
                  <div className="w-full max-w-xs bg-black pt-4 rounded">
                  <h2 className="text-2xl text-center font-semibold mb-4 mt-8">Login</h2>                
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
                              Login
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default Login;

