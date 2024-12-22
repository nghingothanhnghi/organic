// app/components/cmsContent/warrantyContent.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchContent } from '~/features/contentSlice';

const WarrantyContent = () => {
    const dispatch = useAppDispatch();
    const { sections, loading, error } = useAppSelector(state => state.sections);

    useEffect(() => {
        // Fetch content on component mount
        dispatch(fetchContent({ page: 1, pageSize: 1, filters: { category: '' } }));
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="py-10 bg-gradient-to-r from-orange-50 to-orange-50">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                <div className="relative mb-12 px-3 lg:mb-0 text-center">
                    <div className="mb-2 flex justify-center">
                        <span className="text-primary">
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-14"
                            >
                                <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                            </svg>

                        </span>
                    </div>
                    <h5 className="mb-6 text-4xl tracking-tight font-extrabold text-green-600">5000+</h5>
                    <h6 className="mb-0 font-semibold dark:text-neutral-50">Sản phẩm đa dạng</h6>
                    <div
                        className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
                </div>
                <div className="relative mb-12 px-3 lg:mb-0 text-center">
                    <div className="mb-2 flex justify-center">
                        <span className="text-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-14"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                            </svg>

                        </span>
                    </div>
                    <h5 className="mb-6 text-4xl tracking-tight font-extrabold text-green-600">490+</h5>
                    <h6 className="mb-0 font-semibold dark:text-neutral-50">Thực phẩm tự nhiên 100%</h6>
                    <div
                        className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
                </div>
                <div className="relative mb-12 px-3 lg:mb-0 text-center">
                    <div className="mb-2 flex justify-center">
                        <span className="text-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5} stroke="currentColor"
                                className="size-14"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>
                        </span>
                    </div>
                    <h5 className="mb-6 text-4xl tracking-tight font-extrabold text-green-600">100+</h5>
                    <h6 className="mb-0 font-semibold dark:text-neutral-50">Chứng nhận uy tín</h6>
                    <div
                        className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
                </div>
                <div className="relative mb-12 px-3 lg:mb-0 text-center">
                    <div className="mb-2 flex justify-center">
                        <span className="text-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-14"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                            </svg>

                        </span>
                    </div>
                    <h5 className="mb-6 text-4xl tracking-tight font-extrabold text-green-600">24/7</h5>
                    <h6 className="mb-0 font-semibold dark:text-neutral-50">Hỗ trợ tư vấn</h6>
                </div>
            </div>
        </section>
    );
};

export default WarrantyContent;
