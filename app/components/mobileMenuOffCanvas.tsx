import React from "react";
import { Link } from "react-router";

interface MobileMenuOffCanvasProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuOffCanvas: React.FC<MobileMenuOffCanvasProps> = ({ isOpen, toggleMenu }) => {
  return (
    <>
      {/* Mobile Navigation Off-canvas */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-50`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300">
          <div className="text-lg font-bold">Menu</div>
          <button onClick={toggleMenu} className="text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <ul className="flex flex-col items-start space-y-4 mt-4 px-4">
          <li>
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/store" className="text-gray-700 hover:text-gray-900 transition-colors" onClick={toggleMenu}>
              Store
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors" onClick={toggleMenu}>
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>}
    </>
  );
};

export default MobileMenuOffCanvas;
