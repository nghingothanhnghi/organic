import React, { useState } from 'react';
import { useAppDispatch } from '~/hooks';


interface FilterProps {
  onFilterChange: (filters: any) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const dispatch = useAppDispatch();


  return (
    <div className="filter-container">
     
    </div>
  );
};

export default Filter;
