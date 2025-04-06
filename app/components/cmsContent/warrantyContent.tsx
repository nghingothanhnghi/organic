// app/components/cmsContent/warrantyContent.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchContent } from '~/features/contentSlice';
import guaranteedFreshIcon from '~/assets/100_percent-guaranteed_fresh.svg';
import guaranteedIcon from '~/assets/100_percent-guaranteed.svg';
import guaranteedCerificateIcon from '~/assets/100_percent-guaranteed_certificate.svg';
import guaranteedSupportIcon from '~/assets/100_percent-support-24-7.svg';
import LoadingErrorWrapper from '../LoadingErrorWrapper';

const WarrantyContent = () => {
    const dispatch = useAppDispatch();
    const { sections, loading, error } = useAppSelector(state => state.sections);

    useEffect(() => {
        // Fetch content on component mount
        dispatch(fetchContent({ page: 1, pageSize: 1, filters: { category: '' } }));
    }, [dispatch]);

    return (
        <LoadingErrorWrapper loading={loading} error={error}>
            <section className="py-10 bg-gradient-to-r from-orange-50 to-orange-50">
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
                    <div className="relative mb-12 px-3 lg:mb-0 text-center">
                        <div className="mb-2 flex justify-center">
                            <span className="text-primary">
                                <img src={guaranteedFreshIcon} className='size-24 sm:size-36' />
                            </span>
                        </div>
                        <h5 className="mb-6 text-4xl tracking-tight font-extrabold text-green-600">5000+</h5>
                        <h6 className="mb-0 text-sm sm:text-lg font-semibold dark:text-neutral-50">Sản phẩm đa dạng</h6>
                        <div
                            className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
                    </div>
                    <div className="relative mb-12 px-3 lg:mb-0 text-center">
                        <div className="mb-2 flex justify-center">
                            <span className="text-primary">
                                <img src={guaranteedIcon} className='size-24 sm:size-36' />
                            </span>
                        </div>
                        <h5 className="mb-6 text-4xl tracking-tight font-extrabold text-green-600">490+</h5>
                        <h6 className="mb-0 text-sm sm:text-lg font-semibold dark:text-neutral-50">Thực phẩm tự nhiên 100%</h6>
                        <div
                            className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
                    </div>
                    <div className="relative mb-12 px-3 lg:mb-0 text-center">
                        <div className="mb-2 flex justify-center">
                            <span className="text-primary">
                                <img src={guaranteedCerificateIcon} className='size-24 sm:size-36' />
                            </span>
                        </div>
                        <h5 className="mb-6 text-4xl tracking-tight font-extrabold text-green-600">100+</h5>
                        <h6 className="mb-0 text-sm sm:text-lg font-semibold dark:text-neutral-50">Chứng nhận uy tín</h6>
                        <div
                            className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>
                    </div>
                    <div className="relative mb-12 px-3 lg:mb-0 text-center">
                        <div className="mb-2 flex justify-center">
                            <span className="text-primary">
                                <img src={guaranteedSupportIcon} className='size-24 sm:size-36' />
                            </span>
                        </div>
                        <h5 className="mb-6 text-4xl tracking-tight font-extrabold text-green-600">24/7</h5>
                        <h6 className="mb-0 text-sm sm:text-lg font-semibold dark:text-neutral-50">Hỗ trợ tư vấn</h6>
                    </div>
                </div>
            </section>
        </LoadingErrorWrapper>
    );
};

export default WarrantyContent;
