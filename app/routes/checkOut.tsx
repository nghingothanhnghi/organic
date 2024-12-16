import type { Route } from "./+types/cart";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks";
import CartList from "~/components/cartList";
import StepWizard from "~/components/stepWizard";
import UserShippingInfo from "~/components/checkoutProcess/userShippingInfo";
import UserPaymentInfo from "~/components/checkoutProcess/userPaymentInfo";
import UserConfirmInfo from "~/components/checkoutProcess/userConfirmInfo";

const CheckOut = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const [shippingData, setShippingData] = useState({});
    const [paymentData, setPaymentData] = useState({});

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
    const handleFinalSubmit = (finalData: any) => {
        // Combine all collected data and submit the final order
        console.log('Final order submission:', finalData);
        // Call backend API or handle the final submission here
    };

    const steps = [
        {
            title: 'Shipping Info',
            content: (
                <UserShippingInfo
                    onNext={() => handleNext()}
                    setIsValid={setIsValid}
                    setShippingData={setShippingData} // Pass the setter for shipping data
                />
            ),
        },
        {
            title: 'Payment Info',
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
            title: 'Order Confirmation',
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
            <div className="container mx-auto flex-column items-center justify-between py-4 px-6">
                <h1 className="text-2xl font-bold mb-4">CheckOut</h1>
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <StepWizard
                            steps={steps}
                            currentStep={currentStep}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                        />
                    </div>
                    <div>
                        <CartList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
