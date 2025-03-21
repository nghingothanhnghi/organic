import React from 'react';

import { useAppDispatch } from '~/hooks';
import { loginWithFacebook } from '~/features/authSlice';

const FacebookLoginButton: React.FC = () => {
    const dispatch = useAppDispatch();

    const responseFacebook = (response: any) => {
        if (response.accessToken) {
            dispatch(loginWithFacebook(response.accessToken));
        }
    };

    return (
         <button onClick={responseFacebook} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Login with Facebook
    </button>
)}
    
export default FacebookLoginButton;
