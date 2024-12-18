// components/ProductFilter.tsx
import React, { useState } from 'react';

interface ProductFilterProps {
    onFilterChange: (newFilters: Record<string, any>) => void; // Declare the prop type
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [searchName, setSearchName] = useState('');

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handlePriceRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPriceRange(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchName(event.target.value);
    };

    const handleApplyFilters = () => {
        // Trigger the filter change when the user applies filters
        onFilterChange({ category, priceRange, name: searchName });
    };

    return (
        <div className="bg-white p-6 gap-4 mx-auto mb-5">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Filter Products</h3>
            <div className="flex flex-wrap gap-4 justify-center items-center">
                {/* Search by Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Search by Name</label>
                    <input
                        type="text"
                        value={searchName}
                        onChange={handleSearchChange}
                        placeholder="Enter product name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        {/* Add more categories here */}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Price Range</label>
                    <select
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Select Price Range</option>
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
                        Apply Filters
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ProductFilter;

