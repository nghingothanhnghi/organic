import { useEffect, useState } from "react";
import { useAppDispatch } from "~/hooks";
import { loginWithFacebook } from "~/features/authSlice";
import { FACEBOOK_APP_ID } from "~/constants/apiConstants";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void; // ✅ Fix: Declare fbAsyncInit properly
  }
}

export const useFacebookLogin = () => {
  const dispatch = useAppDispatch();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    // ✅ Ensure fbAsyncInit is assigned correctly
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
      setIsSDKLoaded(true);
    };

    // ✅ Load the Facebook SDK only if it's not already loaded
    if (!window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    } else {
      setIsSDKLoaded(true);
    }
  }, []);

  // ✅ Facebook Login Handler
  const login = () => {
    if (!isSDKLoaded) return;

    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          dispatch(loginWithFacebook(response.authResponse.accessToken));
        } else {
          console.error("Facebook login failed:", response);
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return { login, isSDKLoaded };
};
