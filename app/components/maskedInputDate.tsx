import React, { useEffect, useRef } from 'react';
import IMask from 'imask';

interface MaskedInputDateProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    mask: string; // Mask format like 'MM/YY', 'DD/MM/YY', etc.
    placeholder?: string;
    className?: string;
    error?: string;
}

const MaskedInputDate: React.FC<MaskedInputDateProps> = ({ 
    id, 
    name, 
    value, 
    onChange, 
    mask, 
    placeholder, 
    className = '', 
    error 
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            IMask(inputRef.current, {
                mask,
                blocks: {
                    DD: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 31,
                    },
                    MM: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 12,
                    },
                    YY: {
                        mask: IMask.MaskedRange,
                        from: 0,
                        to: 99,
                    },
                },
            });
        }
    }, [mask]);

    return (
        <div>
            <input
                id={id}
                name={name}
                ref={inputRef}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default MaskedInputDate;
