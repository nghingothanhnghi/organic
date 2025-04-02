// app/components/PhoneNumberInput.tsx
import React, { useEffect, useRef } from 'react';
import IMask from 'imask';

interface PhoneNumberInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
    error?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ value, onChange, name, label, error }) => {
    const phoneInputRef = useRef<HTMLInputElement>(null);
    // const maskRef = useRef<InstanceType<typeof IMask.InputMask> | null>(null);

    // Apply phone number mask when the component mounts
    useEffect(() => {
        if (phoneInputRef.current) {
            const phoneMask = IMask(phoneInputRef.current, {
                mask: '+{84}(000)000-000', // Default country code for Vietnam
                lazy: false,  // Ensures the mask is applied immediately, not when the user types
                placeholder: '+84',
            });
            console.log('Phone mask applied', phoneInputRef.current.value);
            // You no longer need to add an event listener manually
        }
    }, []);

    // This change handler will pass the event correctly and log the value
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Before masking:', e.target.value);
        const maskedValue = e.target.value.replace(/[^\d+]/g, '');  // Normalize by removing unwanted characters
        console.log('Phone number typed:', maskedValue);  // Log the value
        onChange({ ...e, target: { ...e.target, value: maskedValue } }); // Pass normalized value to Formik
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
                {label}
            </label>
            <input
                type="text"
                name={name}
                ref={phoneInputRef}
                value={value}
                onChange={handleChange}  // Pass the event handler directly
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${error ? 'border-red-500' : ''
                    }`}
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
    );
};

export default PhoneNumberInput;
