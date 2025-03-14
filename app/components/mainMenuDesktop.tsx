// app/components/ mainMenuDesktop.tsx
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '~/hooks';
import { Link } from 'react-router';
import { fetchMainMenu } from '../features/menuSlice';

const MainMenuDesktop = () => {
  const dispatch = useAppDispatch();
  const { data: menu, loading, error } = useAppSelector(state => state.menu);

  // Fetch the menu when the component mounts
  useEffect(() => {
    dispatch(fetchMainMenu());
  }, [dispatch]);
  

  return (
    <nav className="hidden md:flex space-x-6 lg:order-first">
    {loading ? (
      // Skeleton loader for the menu
      [...Array(4)].map((_, index) => (
        <div
          key={index}
          className="h-6 w-24 bg-gray-200 rounded animate-pulse"
        ></div>
      ))
    ) : error ? (
      <p className="text-red-500">Error: {error}</p>
    ) : (
      menu.map((item) => (
        <Link
          key={item.id}
          to={
            item.__component === 'menu.menu-link' && item.url
              ? item.url
              : '/' // Fallback to "/" if URL is null
          }
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          {item.title}
        </Link>
      ))
    )}
  </nav>
  );
};

export default MainMenuDesktop;
