import { Link } from "react-router";
import { useTranslation } from "react-i18next";

// interface EmptyStateProps {
//     message: string;
//     image?: string; // Optional image
//     link?: string; // Optional redirect link
//     linkText?: string; // Optional link text
// }

// const EmptyState: React.FC<EmptyStateProps> = ({ message, image, link = "/", linkText = "Continue Shopping" }) => {
//     return (
//         <div className="text-center py-10">
//             {image && <img src={image} alt="Empty State" className="mx-auto mb-4 w-40 h-40 object-contain" />}
//             <p className="text-gray-600">{message}</p>
//             {link && (
//                 <Link to={link} className="text-blue-500 underline">
//                     {linkText}
//                 </Link>
//             )}
//         </div>
//     );
// };

// export default EmptyState;

interface EmptyStateProps {
    messageKey: string; // i18n key for the message
    fallbackMessage: string; // Fallback text if translation is missing
    image?: string; // Optional image
    lottieSrc?: string;
    link?: string; // Optional redirect link
    linkTextKey?: string; // i18n key for the link text
    fallbackLinkText?: string; // Fallback text for the link
}

const EmptyState: React.FC<EmptyStateProps> = ({
    messageKey,
    fallbackMessage,
    image,
    lottieSrc,
    link = "/",
    linkTextKey = "btn.continueShopping",
    fallbackLinkText = "Continue Shopping",
}) => {
    const { t } = useTranslation(); // Get translation function

    return (
        <div className="text-center py-10">
                        {/* Render Lottie animation (iframe) if lottieSrc is provided */}
                        {lottieSrc ? (
                <iframe 
                    src={lottieSrc} 
                    className="mx-auto mb-4 w-40 h-40"
                    title="Lottie Animation"
                    frameBorder="0"
                    allowFullScreen
                />
            ) : image ? (
                <img src={image} alt="Empty State" className="mx-auto mb-4 w-40 h-40 object-contain" />
            ) : null}
            {/* {image && <img src={image} alt="Empty State" className="mx-auto mb-4 w-40 h-40 object-contain" />}
            <iframe src="https://lottie.host/embed/35e4c536-4034-4737-a2cc-2852b01d2b4b/lL86Lcve9X.lottie"></iframe> */}
            <p className="text-gray-600">{t(messageKey, fallbackMessage)}</p>
            {link && (
                <Link to={link} className="text-blue-500 underline">
                    {t(linkTextKey, fallbackLinkText)}
                </Link>
            )}
        </div>
    );
};

export default EmptyState;
