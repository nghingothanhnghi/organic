import React from 'react';
import { Link } from 'react-router';

const FooterBottomLinkSection: React.FC = () => {
  return (
    <ul className="mt-3 sm:mt-0 flex flex-wrap justify-center gap-4 text-xs sm:justify-start lg:justify-end">
      <li>
        <Link
          to="/terms"
          className="text-gray-500 transition hover:opacity-75"
        >
          Terms & Conditions
        </Link>
      </li>
      <li>
        <Link
          to="/privacy"
          className="text-gray-500 transition hover:opacity-75"
        >
          Privacy Policy
        </Link>
      </li>
      <li>
        <Link
          to="/cookies"
          className="text-gray-500 transition hover:opacity-75"
        >
          Cookies
        </Link>
      </li>
    </ul>
  );
};

export default FooterBottomLinkSection;
