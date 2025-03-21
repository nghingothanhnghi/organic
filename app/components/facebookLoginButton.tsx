//app/components/facebookLoginButton.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '~/hooks';
import { loginWithFacebook } from '~/features/authSlice';
import { FACEBOOK_APP_ID } from '~/constants/apiConstants';
import FacebookIcon from '~/assets/facebook.png';

const FacebookLoginButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [FacebookLogin, setFacebookLogin] = useState<any>(null); // ✅ Store component dynamically
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        import('react-facebook-login')
            .then(module => {
                console.log("✅ FacebookLogin imported:", module);
                setFacebookLogin(() => module.default);
            })
            .catch(err => {
                console.error("❌ Failed to load react-facebook-login:", err);
                setError("Failed to load Facebook Login.");
            });
    }, []);
    


    const responseFacebook = (response: any) => {
        if (response.accessToken) {
            dispatch(loginWithFacebook(response.accessToken));
            navigate('/dashboard'); // ✅ Navigate after success
        } else {
            console.error("Facebook login failed:", response);
        }
    };

    if (error) return <p className="text-red-500">Error: {error}</p>; // ✅ Display import error if any

    if (!FacebookLogin) return <p className="text-gray-500">Loading Facebook Login...</p>; // ✅ Show fallback while loading

    return (
        <FacebookLogin
            appId={FACEBOOK_APP_ID} // Replace with your Facebook App ID
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="text-gray-700 hover:bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center"
            icon={<img src={FacebookIcon} alt="Facebook" className="w-10 h-11" />}
            textButton=""
        />
   
    )
}

export default FacebookLoginButton;
