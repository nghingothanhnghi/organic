import { Link } from "react-router";
import { useTranslation } from "react-i18next";

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
            <p className="text-gray-600 mb-8">{t(messageKey, fallbackMessage)}</p>
            {link && (
                <div className="flex items-center justify-center space-x-3">
                    <Link to={link} className="flex items-center justify-center text-sm font-semibold px-4 py-2 text-white rounded-lg shadow-md hover:shadow-lg bg-gradient-to-r from-sky-500 from-10% to-emerald-500 to-90% hover:from-emerald-500 hover:to-sky-500 transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 me-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                        </svg>
                        {t(linkTextKey, fallbackLinkText)}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default EmptyState;
