import React from 'react';
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
  // If the modal is not open, return null (don't render anything)
  if (!isOpen) return null;

    // Set a dynamic class for the modal size
    const modalSizeClasses = {
      small: 'w-1/3',
      medium: 'w-3/6',
      large: 'w-4/5',
    };

      // Positioning logic
  const positionClasses = {
    center: 'items-center', // Center vertically
    bottom: 'items-end', // Stick to bottom with padding
  };

  return ReactDOM.createPortal(
    <div className={`fixed inset-0 z-50 flex justify-center ${positionClasses[position] || positionClasses.center} bg-black bg-opacity-50`}>
      <div
      className={`bg-white rounded-lg p-8 flex flex-col 
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
        <div className="mt-4 flex justify-end">
          {actions}
        </div>
      </div>
    </div>,
    document.body // Append modal to the body
  );
};

export default Modal;
