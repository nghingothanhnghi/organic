import React, { useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;               // Whether the modal is open or not
  onClose: () => void;           // Function to close the modal
  title?: ReactNode;                // Modal title
  content: ReactNode;            // Content inside the modal (can be anything like text, form, etc.)
  actions: ReactNode;            // Actions (buttons) that will be displayed in the footer
  size?: 'small' | 'medium' | 'large'; // Modal size (default is 'medium')
  fullWidth?: boolean;
  fullHeight?: boolean;
  position?: 'center' | 'bottom';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, actions, size = 'medium', fullWidth = false, fullHeight = false, position = 'center'  }) => {
  
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setTimeout(() => setIsAnimating(false), 300); // Wait for animation before removing from DOM
    }
  }, [isOpen]);
  
  // If the modal is not open, return null (don't render anything)
  if (!isOpen && !isAnimating) return null;

    // Set a dynamic class for the modal size
    const modalSizeClasses = {
      small: 'sm:w-1/3 w-full',   // 100% on mobile, 1/3 on small screens
      medium: 'sm:w-3/6 w-full',  // 100% on mobile, 3/6 on small screens
      large: 'sm:w-4/5 w-full',   // 100% on mobile, 4/5 on small screens
    };

      // Positioning logic
  const positionClasses = {
    center: 'items-center', // Center vertically
    bottom: 'items-end', // Stick to bottom with padding
  };

  return ReactDOM.createPortal(
    <div className={`fixed inset-0 z-50 flex justify-center 
    ${positionClasses[position] || positionClasses.center} bg-black bg-opacity-50
    transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }
    `}
    >
      <div
      className={`bg-white rounded-lg p-8 flex flex-col
        transition-all duration-300 transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } 
        ${fullWidth ? 'w-full max-w-4/5' : modalSizeClasses[size] || modalSizeClasses.medium} 
        ${fullHeight ? 'h-screen' : 'max-h-[90vh]'} 
        overflow-y-auto`} 
      // className={`bg-white rounded-lg p-8 ${modalSizeClasses[size] || modalSizeClasses.medium} flex flex-col`}
      >
        <div className="flex justify-between items-center">
          <div>{title || '\u00A0'}</div>
          <button className="text-gray-500" onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto mt-4">
          {content}
        </div>
        <div className="mt-8 flex justify-center">
          {actions}
        </div>
      </div>
    </div>,
    document.body // Append modal to the body
  );
};

export default Modal;
