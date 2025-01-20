import { Link } from "@tanstack/react-router";

const NavBar = () => {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100">
      <div className="p-2 mb-4 md:mb-0">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
          className="mr-8"
        >
          Home
        </Link>
        <Link to="/courses" className="mr-4">Courses</Link>
      </div>

      <div className="flex items-center mb-4 md:mb-0">
        <img src="/public/images/logo2.png" alt="logo" className="h-12 mr-2" />
        <h1 className="text-xl font-bold">Dance Management System</h1>
      </div>

      <div className="p-2">
        <Link to="/register" className="mr-8">Register</Link> 
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;