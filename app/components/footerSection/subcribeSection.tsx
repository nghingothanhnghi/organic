import React from 'react';

const SubcribeSection: React.FC = () => {
    return (
        <div className='mt-8'>
            <form className="w-full">
                <label htmlFor="UserEmail" className="sr-only"> Email </label>
                <div
                    className="border border-orange-900 p-2 focus-within:ring sm:flex sm:items-center sm:gap-2"
                >
                    <input
                        type="email"
                        id="UserEmail"
                        placeholder="john@rhcp.com"
                        className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                    />

                    <button
                        className="mt-1 w-full px-6 py-2 text-sm font-bold uppercase tracking-wide text-white transition-none bg-orange-900 hover:bg-orange-800 sm:mt-0 sm:w-auto sm:shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mx-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>

                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubcribeSection;
