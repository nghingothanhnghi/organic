import React from "react";
import { useFacebookLogin } from "~/hooks/useFacebookLogin";
import FacebookIcon from "~/assets/facebook.png"; // Your own icon

const FacebookCustomLoginButton: React.FC = () => {
  const { login, isSDKLoaded } = useFacebookLogin();

  return (
    <button
      onClick={login}
      disabled={!isSDKLoaded}
      className={`w-full flex items-center justify-center gap-2 text-sm font-medium py-3 px-4 rounded-lg shadow-md transition 
        ${isSDKLoaded ? "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 cursor-pointer" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
    >
      <img src={FacebookIcon} alt="Facebook" className="w-6 h-6" />
      Facebook
    </button>
  );
};

export default FacebookCustomLoginButton;
