import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { danceClassesFetch } from "../utils/danceClassFetch";
import { DanceClassProp } from "../types/danceClassTypes";
import ErrorMessage from "./errorMessage";
import { useAppSelector } from "../context/hooks";

const NavBar = () => {
  const [danceClasses, setDanceClasses] = useState<DanceClassProp[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fetchError, setFetchError] = useState<string | unknown>(null);
  const [activeItem, setActiveItem] = useState("");

  const userRole = useAppSelector((state) => state.user.role);

  useEffect(() => {
    const getDanceClasses = async () => {
      try {
        const response = await danceClassesFetch();
        if (response?.data && Array.isArray(response.data)) {
          setDanceClasses(response.data as DanceClassProp[]);
        } else {
          setDanceClasses([]);
        }
      } catch (error) {
        setFetchError(error);
      }
    };
    getDanceClasses();
  }, []);

  return (
    <nav className="flex flex-col sticky top-0 ">
      <div
        className="flex flex-col 
        sm:flex-row 
        justify-between 
        items-center 
        p-4 
        bg-main"
      >
        {/* Mobile: First Row - Logo and Title */}
        <div
          className="w-full justify-center items-center 
          sm:w-auto 
          sm:absolute 
          sm:left-1/2 
          sm:transform 
          sm:-translate-x-1/2 
          mb-4 
          sm:mb-0
          flex"
        >
          <img
            src="/public/images/logo2.png"
            alt="logo"
            className="h-16 w-auto mb-2 sm:mb-0 sm:mr-2"
          />
          <h1 className="text-xl font-bold text-center sm:text-left">
            Dance Management System
          </h1>
        </div>

        {/* Mobile: Second Row - Home and Classes*/}
        <div
          className="flex flex-col 
          sm:flex-row 
          w-full 
          sm:w-auto 
          justify-center 
          items-center 
          space-y-4 
          sm:space-y-0 
          sm:space-x-4 
          mb-4 
          sm:mb-0"
        >
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`cursor-pointer px-3 py-2 rounded ${
                activeItem === "home" ? "bg-prim text-black" : ""
              }`}
              onClick={() => {
                setIsDropdownOpen(false);
                setActiveItem("home");
              }}
            >
              Home
            </Link>
            {userRole == "Admin" && (
              <Link
                to="/danceClassList"
                className={`cursor-pointer px-3 py-2 rounded ${
                  activeItem === "classes" ? "bg-prim text-black" : ""
                }`}
                onClick={() => {
                  setIsDropdownOpen(false);
                  setActiveItem("classes");
                }}
              >
                Classes
              </Link>
            )}

            {userRole == "User" && (
              <>
                {/* Dropdown for Classes */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      setActiveItem("dropdown");
                    }}
                    className={`cursor-pointer px-3 py-2 rounded ${
                      activeItem === "dropdown" ? "bg-prim text-black" : ""
                    }`}
                  >
                    Classes
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 bg-prim border shadow-md rounded w-48 border-prim bg-white z-10">
                      {danceClasses.map(
                        (danceClass: { id: string; name: string }) => (
                          <Link
                            key={danceClass.id}
                            to="/detailsDanceClass"
                            search={{
                              id: danceClass.id,
                            }}
                            className="block p-2 text-black hover:bg-black hover:text-prim transition-colors duration-300 ease-in-out"
                            onClick={() => {
                              setIsDropdownOpen(false);
                              setActiveItem("");
                            }}
                          >
                            {danceClass.name}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile: Third Row - Register and Login */}
        <div
          className="flex w-full 
          sm:w-auto 
          justify-center 
          items-center 
          space-x-4"
        >
          <Link
            to="/register"
            className={`cursor-pointer px-3 py-2 rounded ${
              activeItem === "register" ? "bg-prim text-black" : ""
            }`}
            onClick={() => {
              setIsDropdownOpen(false);
              setActiveItem("register");
            }}
          >
            Register
          </Link>
          <Link
            to="/login"
            className={`cursor-pointer px-3 py-2 rounded ${
              activeItem === "login" ? "bg-prim text-black" : ""
            }`}
            onClick={() => {
              setIsDropdownOpen(false);
              setActiveItem("login");
            }}
            search={{ success: false }}
          >
            Login
          </Link>
        </div>
      </div>
      {fetchError != null && <ErrorMessage message={fetchError} />}
    </nav>
  );
};

export default NavBar;
