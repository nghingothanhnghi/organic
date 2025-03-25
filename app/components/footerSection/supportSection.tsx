import React from 'react';
import CollapseItem from '../collapseItem';

const SupportSection: React.FC = () => {
  return (
    <CollapseItem title="Support" targetClass="support-collapse">
      <ul className='space-y-2'>
        <li>
          <a href="#" className="text-slate-300 hover:text-orange-900 text-sm">
            Help Center
          </a>
        </li>
        <li>
          <a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">
            Terms of Service
          </a>
        </li>
        <li>
          <a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">
            Returns & Exchanges
          </a>
        </li>
      </ul>
    </CollapseItem>
  );
};

export default SupportSection;
