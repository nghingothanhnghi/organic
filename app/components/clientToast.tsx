"use client"; // Ensures this is a client-only component

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure styles are loaded correctly

export default function ClientToast() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this component only renders after hydration
  }, []);

  if (!isClient) return null; // Prevents rendering on the server

  return (
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={true}
      theme="dark"
      toastClassName="w-full sm:max-w-[95%] mx-auto mt-2"
    />
  );
}
