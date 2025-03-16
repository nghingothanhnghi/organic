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
import { submitOrder, createOrder, clearOrder } from "~/features/checkOutSlice";
import { useTranslation } from "react-i18next";

const CheckOut = () => {
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
            // id: Date.now(), // Temporary ID for frontend usage
            // purchaseOrder: `PO-${Date.now()}`, // Generate a purchase order number
            items: cartItems, // Ensure this matches the expected `items` array
            shippingDetails: shippingData,
            paymentDetails: paymentData,
            // status: 'Pending',
        };

        console.log('Final order submission:', finalOrderData);

        // Dispatch the action to submit the order with all the data
        // dispatch(submitOrder(finalOrderData));

        // // After the order is successfully placed, clear the cart
        // dispatch(clearOrder());

        // // Navigate to the order confirmation page or home page after successful order
        // navigate('/order-confirmation'); // Adjust the path as needed

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
                <h1 className="text-lg lg:text-2xl font-bold mb-4">{t("page_title.checkout")}</h1>
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 lg:gap-8 w-full">
                    <div className="col-span-1 lg:col-span-6 w-full lg:pe-10">
                        <StepWizard
                            steps={steps}
                            currentStep={currentStep}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                        />
                    </div>
                    <div className="col-span-1 lg:col-span-4 w-full">
                        <CartList />
                        <CartSummary taxRate={0} shippingFee={0} className="mt-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
