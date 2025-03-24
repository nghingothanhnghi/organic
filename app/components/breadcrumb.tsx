import React from 'react';
import { Link } from 'react-router';

type BreadcrumbItem = {
    label: string;
    path?: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav aria-label="breadcrumb">
            <div className='max-w-screen-xl mx-auto flex items-center justify-between py-1 px-3 sm:px-6'>
                <ol className="flex space-x-2 text-xs text-gray-500">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center">
                            {item.path ? (
                                <Link
                                    to={item.path}
                                    className="text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-gray-500">{item.label}</span>
                            )}
                            {/* Add separator between breadcrumbs */}
                            {index < items.length - 1 && (
                                <span className="mx-2 text-gray-400">/</span>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumb;
