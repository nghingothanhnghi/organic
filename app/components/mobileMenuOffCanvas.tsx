import React, { useEffect } from "react";
import { Link } from "react-router";
import { useAppSelector, useAppDispatch } from "~/hooks";
import { fetchMainMenu } from "~/features/menuSlice";
import UserProfileMobileMenu from "./userProfileMobileMenu";

interface MobileMenuOffCanvasProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuOffCanvas: React.FC<MobileMenuOffCanvasProps> = ({ isOpen, toggleMenu }) => {
  const dispatch = useAppDispatch();
  const { data: menu, loading, error } = useAppSelector(state => state.menu);

  // Fetch menu data when the component mounts
  useEffect(() => {
    dispatch(fetchMainMenu());
  }, [dispatch]);
  return (
    <>
      {/* Mobile Navigation Off-canvas */}
      <nav
        className={`fixed flex flex-col top-0 left-0 h-full w-80 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden z-50`}
      >
        {/* Header */}
        <div className="flex items-center justify-between space-x-2 p-4">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <UserProfileMobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
        <div className="flex-1 overflow-y-scroll p-3">
          {/* Menu Links */}
          <ul className="flex flex-col items-start space-y-4">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              menu.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.__component === "menu.menu-link" && item.url ? item.url : "/"}
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={toggleMenu} // Close menu on click
                  >
                    {item.title}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>}
    </>
  );
};

export default MobileMenuOffCanvas;
