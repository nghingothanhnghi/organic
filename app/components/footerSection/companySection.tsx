import React from 'react';
import CollapseItem from '../collapseItem';

const CompanySection: React.FC = () => {
    return (
        <CollapseItem title="Company" targetClass="company-collapse">
            <ul>
                <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">About Us</a></li>
                <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">Careers</a></li>
                <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">Press</a></li>
                <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">Contact</a></li>
            </ul>
        </CollapseItem>
    );
};

export default CompanySection;
