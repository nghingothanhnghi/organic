import React from "react";
import { useFacebookLogin } from "~/hooks/useFacebookLogin";
import FacebookIcon from "~/assets/facebook.png"; // Your own icon

const FacebookCustomLoginButton: React.FC = () => {
  const { login, isSDKLoaded } = useFacebookLogin();

  return (
    <button
      onClick={login}
      disabled={!isSDKLoaded}
      className={`w-full flex items-center justify-center gap-2 text-white font-medium py-3 px-4 rounded-lg shadow-md transition ${
        isSDKLoaded ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
      }`}
    >
      <img src={FacebookIcon} alt="Facebook" className="w-6 h-6" />
      Facebook
    </button>
  );
};

export default FacebookCustomLoginButton;
