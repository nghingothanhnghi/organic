//app/components/facebookLoginButton.tsx
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useAppDispatch } from '~/hooks';
import { loginWithFacebook } from '~/features/authSlice';
import { FACEBOOK_APP_ID } from '~/constants/apiConstants';

const FacebookLoginButton: React.FC = () => {
    const dispatch = useAppDispatch();

    const responseFacebook = (response: any) => {
        if (response.accessToken) {
            dispatch(loginWithFacebook(response.accessToken));
        } else {
            console.error("Facebook login failed:", response);
        }
    };

    return (
        <FacebookLogin
            appId={FACEBOOK_APP_ID} // Replace with your Facebook App ID
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="bg-blue-600 text-white px-4 py-2 rounded-lg"
            icon="fa-facebook"
            textButton="Login with Facebook"
        />
    )
}

export default FacebookLoginButton;
