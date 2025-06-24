// src/components/inputSearchGlobal.tsx
import React from 'react';
import Modal from "./modal";
import { useTranslation } from 'react-i18next';


export const InputSearchGlobal: React.FC = () => {
    const { t } = useTranslation();

    return (
        <form className="max-w-md mx-auto hidden lg:flex">
            <div className="relative">
                <input type="search" className="block w-full py-2 ps-2 pe-10 text-sm text-gray-900 border border-gray-200 rounded-full bg-gray-200" placeholder="Search Posts, Products..." required />
                <button type="submit" className="text-gray-700 absolute end-2.5 bottom-0.5 bg-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 ">
                     <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                </button>
            </div>
        </form>
    );
}

