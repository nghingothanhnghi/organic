// components/ProductFilter.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useResponsive from '~/hooks/useResponsive';

interface ProductFilterProps {
    onFilterChange: (newFilters: Record<string, any>) => void; // Declare the prop type
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
    const { t } = useTranslation();
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const [categories, setCategories] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [searchName, setSearchName] = useState('');

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
        const filters = { categories, priceRange, name: searchName };
        console.log("Applying Filters:", filters);
        // Trigger the filter change when the user applies filters
        onFilterChange({ categories, priceRange, name: searchName });
    };

    return (
        <div className="bg-white p-6 gap-4 mx-auto mb-5">
            <div className="flex flex-wrap gap-4 justify-center items-center">
                {/* Search by Name */}
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
                    <select
                        value={categories}
                        onChange={handleCategoryChange}
                        className="h-10 rounded border-gray-300 text-sm"
                    >
                        <option value="">All</option>
                        <option value="Thực phẩm hữu cơ">Thực phẩm hữu cơ</option>
                        {/* Add more categories here */}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t("select.priceRange.label")}</label>
                    <select
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                        className="h-10 rounded border-gray-300 text-sm"
                    >
                        <option value="">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleApplyFilters}
                        className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;

