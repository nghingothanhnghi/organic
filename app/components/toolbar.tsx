import React, { useState } from 'react';

interface ToolbarProps {
    onFilterChange: (filters: { name?: string; brand?: string; priceRange?: [number, number] }) => void;
    onSortChange: (sortBy: string) => void;
    brands: string[];
  }

const Toolbar: React.FC<ToolbarProps> = ({ onFilterChange, onSortChange, brands }) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<'alphabetical' | 'latest' | 'priceLowToHigh' | 'priceHighToLow'>('latest');

  const handleFilterApply = () => {
    onFilterChange({
      name: name || undefined, // Ensures optional property if empty
      brand: brand || undefined,
      priceRange: priceRange.length === 2 ? priceRange : undefined, // Ensures optional property
    });
  };
  

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as 'alphabetical' | 'latest' | 'priceLowToHigh' | 'priceHighToLow';
    setSortBy(value);
    onSortChange(value);
  };

  return (
    <div className="toolbar flex items-center gap-4 p-4 bg-gray-100 border-b">
      {/* Search by Name */}
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-48"
      />

      {/* Filter by Brand */}
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="select select-bordered w-48"
      >
        <option value="">All Brands</option>
        {brands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      {/* Filter by Price Range */}
      <div className="price-range flex items-center gap-2">
        <input
          type="number"
          placeholder="Min Price"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          className="input input-bordered w-20"
        />
        <span>–</span>
        <input
          type="number"
          placeholder="Max Price"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="input input-bordered w-20"
        />
      </div>

      {/* Sort Options */}
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="select select-bordered w-48"
      >
        <option value="alphabetical">Sort by Alphabetical</option>
        <option value="latest">Sort by Latest</option>
        <option value="priceLowToHigh">Sort by Price: Low to High</option>
        <option value="priceHighToLow">Sort by Price: High to Low</option>
      </select>

      {/* Search Button */}
      <button
        onClick={handleFilterApply}
        className="btn btn-primary"
      >
        Search
      </button>
    </div>
  );
};

export default Toolbar;
