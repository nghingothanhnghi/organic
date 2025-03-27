// components/ProductFilter.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useResponsive from '~/hooks/useResponsive';
import Modal from './modal';

interface ProductFilterProps {
    onFilterChange: (newFilters: Record<string, any>) => void; // Declare the prop type
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
    const { t, i18n } = useTranslation();
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const [categories, setCategories] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [searchName, setSearchName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isModalOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isModalOpen]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategories(event.target.value);
    };

    const handlePriceRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPriceRange(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value);
    };

    const handleApplyFilters = () => {
        const filters = { 
            categories, 
            priceRange, 
            name: searchName,
        
        };
        console.log("Applying Filters:", filters);
        // Trigger the filter change when the user applies filters
        onFilterChange(filters);
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white p-6 gap-4 mx-auto mb-5">
            {isMobile ? (
                <div className="flex items-center justify-between">
                    <div className="w-full flex items-center bg-gray-100 rounded-lg p-2 pe-4 cursor-pointer" onClick={() => setIsModalOpen(true)}>
                        <input
                            type="text"
                            value={searchName}
                            readOnly
                            placeholder={t("input.searchByName.placeholder")}
                            className="h-10 rounded border-transparent text-sm flex-grow bg-transparent focus:outline-none"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        fullWidth
                        position="bottom"
                        content={
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    ref={searchInputRef}
                                    value={searchName}
                                    onChange={handleSearchChange}
                                    placeholder={t("input.searchByName.placeholder")}
                                    className="h-10 rounded border-gray-300 text-sm w-full focus:outline-none"
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">{t("select.category.label")}</label>
                                    <select value={categories} onChange={handleCategoryChange} className="h-10 rounded border-gray-300 text-sm w-full">
                                        <option value="">All</option>
                                        <option value="Thực phẩm hữu cơ">Thực phẩm hữu cơ</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">{t("select.priceRange.label")}</label>
                                    <select value={priceRange} onChange={handlePriceRangeChange} 
                                    className="h-10 rounded border-gray-300 text-sm w-full">
                                        <option value="">{t("select.priceRange.options.all_price")}</option>
                                        <option value="highest">{t("select.priceRange.options.best_price")}</option>
                                        <option value="lowest">{t("select.priceRange.options.lowest_price")}</option>
                                    </select>
                                </div>
                            </div>
                        }
                        actions={
                            <button 
                            onClick={handleApplyFilters} 
                            className="bg-green-600 w-full text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300">
                                {t("btn.search")}
                            </button>
                        }
                    />
                </div>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center items-center">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">{t("input.searchByName.label")}</label>
                        <input
                            type="text"
                            value={searchName}
                            onChange={handleSearchChange}
                            placeholder={t("input.searchByName.placeholder")}
                            className="h-10 rounded border-gray-300 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">{t("select.category.label")}</label>
                        <select value={categories} onChange={handleCategoryChange} className="h-10 rounded border-gray-300 text-sm">
                            <option value="">{t("select.category.options.all_category")}</option>
                            <option value="Thực phẩm hữu cơ">{t("select.category.options.organic_food")}</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">{t("select.priceRange.label")}</label>
                        <select value={priceRange} onChange={handlePriceRangeChange} className="h-10 rounded border-gray-300 text-sm">
                            <option value="">{t("select.priceRange.options.all_price")}</option>
                            <option value="highest">{t("select.priceRange.options.best_price")}</option>
                            <option value="lowest">{t("select.priceRange.options.lowest_price")}</option>
                        </select>
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handleApplyFilters}
                            className="text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg bg-orange-900 hover:bg-orange-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>

                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductFilter;

