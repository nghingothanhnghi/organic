// app/components/ mainMenuDesktop.tsx
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '~/hooks';
import { Link } from 'react-router';
import { fetchMainMenu } from '../features/menuSlice';

const MainMenuDesktop = () => {
  const dispatch = useAppDispatch();
  const { data: menu, loading, error } = useAppSelector(state => state.menu);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  // Fetch the menu when the component mounts
  useEffect(() => {
    dispatch(fetchMainMenu());
  }, [dispatch]);


  return (
    <nav className="hidden md:flex space-x-6 lg:order-first">
      {loading ? (
        [...Array(4)].map((_, index) => (
          <div key={index} className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
        ))
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        menu.map((item) => (
          <div key={item.id} className="relative">
            {/* Render Normal Menu Link */}
            {item.__component === 'menu.menu-link' && (
              <Link to={item.url || '/'} className="text-gray-700 hover:text-gray-900 transition-colors">
                {item.title}
              </Link>
            )}

            {/* Render Dropdown Menu */}
            {item.__component === 'menu.dropdown' && (
              <div
                className="relative flex items-center space-x-1 cursor-pointer"
                onMouseEnter={() => setOpenDropdown(item.id)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span className="text-gray-700 hover:text-gray-900 transition-colors">
                  {item.title}
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-3 ms-2 transition-transform transform ${openDropdown ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>

                {/* Dropdown Menu */}
                {openDropdown === item.id && (
                  <div className="absolute pb-2 left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                    {item.sections?.data.map((section) => (
                      <div key={section.id} className="p-2 border-b last:border-none">
                        <span className="block text-gray-600 hover:text-gray-800">
                          {section.attributes.heading}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </nav>
  );
};

export default MainMenuDesktop;
