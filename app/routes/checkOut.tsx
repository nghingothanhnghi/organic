import type { Route } from "./+types/checkOut";
import { useState } from "react";
import { useNavigate } from 'react-router'; // Import useNavigate
import { useAppDispatch, useAppSelector } from "~/hooks";
import Breadcrumb from "~/components/breadcrumb";
import CartList from "~/components/cartList";
import StepWizard from "~/components/stepWizard";
import UserShippingInfo from "~/components/checkoutProcess/userShippingInfo";
import UserPaymentInfo from "~/components/checkoutProcess/userPaymentInfo";
import UserConfirmInfo from "~/components/checkoutProcess/userConfirmInfo";
import CartSummary from "~/components/cartSummary";
import useResponsive from "~/hooks/useResponsive";
import useToggleClass from "~/hooks/useToggleClass";
import { formatPrice } from "~/utils/formatPrice";
import { submitOrder, createOrder, clearOrder } from "~/features/checkOutSlice";
import { useTranslation } from "react-i18next";

const CheckOut = () => {
    const { isMobile } = useResponsive();
    const { isActive, toggleClass } = useToggleClass(false, "cart-container");
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const breadcrumbItems = [
        { label: t("page_title.home"), path: '/' },
        { label: t("page_title.checkout"), path: '/checkout' },
    ];
    const [currentStep, setCurrentStep] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const [shippingData, setShippingData] = useState({});
    const [paymentData, setPaymentData] = useState({});

    // Get cart items from the Redux store
    const cartItems = useAppSelector((state) => state.cart.items);

    const dispatch = useAppDispatch();

    const handleNext = () => {
        if (isValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Define handleFinalSubmit before using it
    const handleFinalSubmit = async () => {
        // Ensure the order structure matches the expected format
        const finalOrderData = {
            items: cartItems, // Ensure this matches the expected `items` array
            shippingDetails: shippingData,
            paymentDetails: paymentData,
            // status: 'Pending',
        };

        console.log('Final order submission:', finalOrderData);

        try {
            // Dispatch the action to create the order via the backend API
            const resultAction = await dispatch(createOrder(finalOrderData));

            if (createOrder.fulfilled.match(resultAction)) {
                // If order creation is successful, clear the cart and navigate
                dispatch(clearOrder());
                navigate('/order-confirmation'); // Adjust the path as needed
            } else {
                // toast.error(t('error.order_creation_failed')); // Display error message
            }
        } catch (error) {
            console.error('Order submission failed:', error);
            // toast.error(t('error.unexpected_error'));
        }



    };

    const steps = [
        {
            title: t("section_title.view_by_user_shipping_info.title"),
            content: (
                <UserShippingInfo
                    onNext={() => handleNext()}
                    setIsValid={setIsValid}
                    setShippingData={setShippingData} // Pass the setter for shipping data
                />
            ),
        },
        {
            title: t("section_title.view_by_user_payment_info.title"),
            content: (
                <UserPaymentInfo
                    onNext={() => handleNext()}
                    handlePrevious={handlePrevious}
                    setIsValid={setIsValid}
                    setPaymentData={setPaymentData} // Pass the setter for payment data
                />
            ),
        },
        {
            title: t("section_title.view_by_user_order_confirmation.title"),
            content: (
                <UserConfirmInfo
                    setIsValid={setIsValid}
                    shippingData={shippingData}
                    paymentData={paymentData}
                    onSubmit={handleFinalSubmit} // Pass final submit handler
                />
            ),
        },
    ];
    return (
        <div className="CheckOut-container">
            <Breadcrumb items={breadcrumbItems} />
            <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
                <div className="flex justify-between">
                    <h1 className="text-lg lg:text-2xl font-bold mb-4">{t("page_title.checkout")}</h1>
                    {/* Toggle Button for Mobile */}
                    {isMobile && (
                        <button
                            onClick={toggleClass}
                            className="text-sm flex items-center px-3 py-2 rounded-lg hover:bg-gray-200 hover:shadow-md"
                        >

                            <span className="flex flex-col items-end">
                                <span className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                    <span className="text-xs text-gray-500">{t("dataGrid.headerName.totalAmount")}</span>
                                </span>
                                <span className="text-xs font-semibold text-orange-700">{formatPrice(total)}</span>
                            </span>

                            {/* {isActive ? "Hide Cart" : "Show Cart"} */}
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 lg:gap-8 w-full">
                    <div className="col-span-1 lg:col-span-6 w-full lg:pe-10">
                        <StepWizard
                            steps={steps}
                            currentStep={currentStep}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                        />
                    </div>
                    <div
                        className={`cart-container col-span-1 lg:col-span-4 w-full 
                        ${isMobile ? "order-first p-4" : ""} 
                        ${isMobile && !isActive ? "hidden" : ""}`}
                    >
                        <CartList />
                        <CartSummary taxRate={0} shippingFee={0} className="mt-4" onTotalChange={setTotal} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
