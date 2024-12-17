// app/components/pagination.tsx
import React from 'react';
import type { PaginationProps } from '~/types/pagination';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-center space-x-4 py-4 my-10">
            <button
                className={`px-4 py-2 bg-green-500 text-white rounded-md flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-green-600'
                    }`}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

            </button>
            <span className="text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
            </span>
            <button
                className={`px-4 py-2 bg-green-500 text-white rounded-md flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-green-600'
                    }`}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>

            </button>
        </div>
    );
};

export default Pagination;
