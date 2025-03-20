import React from 'react';

const SubcribeSection: React.FC = () => {
    return (
        <div className='mt-8'>
            <form className="w-full">
                <label htmlFor="UserEmail" className="sr-only"> Email </label>
                <div
                    className="border border-orange-900 p-2 focus-within:ring sm:flex sm:items-center sm:gap-4"
                >
                    <input
                        type="email"
                        id="UserEmail"
                        placeholder="john@rhcp.com"
                        className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                    />

                    <button
                        className="mt-1 w-full px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none bg-orange-900 hover:bg-orange-800 sm:mt-0 sm:w-auto sm:shrink-0"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubcribeSection;
