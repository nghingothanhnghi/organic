// app/components/radioGridSelector.tsx
import React from 'react';

interface Option {
  id: string;
  value: string | number;
  label: string;
  description?: string;
  price?: string;
  icon?: React.ReactNode;
}

interface RadioGridSelectorProps {
  options: Option[];
  name: string;
  columns?: number; // Number of columns in the grid
  selectedValue: string | number; // selected value can be string or number
  onChange: (value: string | number) => void; // onChange handles both string and number
}

const RadioGridSelector: React.FC<RadioGridSelectorProps> = ({
  options,
  name,
  columns = 2,
  selectedValue,
  onChange
}) => {
  return (
    <fieldset
      className={`grid grid-cols-1 sm:grid-cols-${columns} gap-4`}
      role="radiogroup"
    >
      <legend className="sr-only">{name}</legend>
      {options.map((option) => (
        <div key={option.id}>
          <label
            htmlFor={option.id}
            className={`flex items-start gap-3 cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 ${String(selectedValue) === String(option.value) ? 'border-blue-500 ring-1 ring-blue-500' : ''
              }`}
          >
            {option.icon && (
              <div className="w-5 h-5 mt-1 text-gray-600 flex-shrink-0">
                {option.icon}
              </div>
            )}
            <div className="flex-1">
              <p className="text-gray-700">{option.label}</p>
              {option.description && <p className="mt-1 text-gray-500">{option.description}</p>}
              {option.price && <p className="mt-1 text-gray-900">{option.price}</p>}
            </div>
            <input
              type="radio"
              id={option.id}
              name={name}
              value={String(option.value)} // Ensure the value is a string when setting the radio input
              className="sr-only"
              checked={String(selectedValue) === String(option.value)} // Compare as strings
              onChange={() => onChange(option.value)} // Call onChange with the option's value
            />
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default RadioGridSelector;

