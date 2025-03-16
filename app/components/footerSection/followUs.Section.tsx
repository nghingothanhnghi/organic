import React from 'react';

const FollowUsSection: React.FC = () => {
  return (
    <div>
      <h4 className="hidden sm:block text-white font-semibold text-sm mb-3">Follow Us</h4>
      <ul className="flex justify-center sm:justify-start space-x-4">
        <li>
          <a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">
            Facebook
          </a>
        </li>
        <li>
          <a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">
            Twitter
          </a>
        </li>
        <li>
          <a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">
            Instagram
          </a>
        </li>
        <li>
          <a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FollowUsSection;
