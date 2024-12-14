import { useState } from 'react';

// Custom hook to manage off-canvas sidebar state
export const useOffCanvas = () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((prev) => !prev);

    return {
        isOpen,
        open,
        close,
        toggle,
    };
};
