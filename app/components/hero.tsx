// components/Hero.tsx
import React from 'react';
import type { HeroProps } from '~/types/hero';

const Hero: React.FC<HeroProps> = ({ title, description }) => {
  return (
    <div className="text-center py-8 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <h1 className="text-4xl font-bold text-white ">{title}</h1>
      <p className="text-xl text-slate-100 mt-4">{description}</p>
    </div>
  );
};

export default Hero;
