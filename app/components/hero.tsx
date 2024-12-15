// components/Hero.tsx
import React from 'react';
import type { HeroProps } from '~/types/hero';

const Hero: React.FC<HeroProps> = ({ title, description }) => {
  return (
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
      <p className="text-xl text-gray-600 mt-4">{description}</p>
    </div>
  );
};

export default Hero;
