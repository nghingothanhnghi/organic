//app/types/react-facebook-login.d.ts
declare module 'react-facebook-login' {
    import * as React from 'react';

    export interface ReactFacebookLoginProps {
        appId: string;
        autoLoad?: boolean;
        fields?: string;
        callback: (response: any) => void;
        cssClass?: string;
        icon?: string;
        textButton?: string;
    }

    const ReactFacebookLogin: React.FC<ReactFacebookLoginProps>;

    export default ReactFacebookLogin;
}
