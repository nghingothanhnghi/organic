import React from 'react';
import { CMS_MANAGEMENT_URL } from '~/constants/apiConstants';

const CmsManagementEmbed: React.FC = () => {
  return (
    <div className="w-full h-[800px] md:h-screen flex items-center justify-center">
      <iframe
        src={CMS_MANAGEMENT_URL}
        title="CMS Management"
        className="w-full h-full border-none"
        allowFullScreen
        sandbox='allow-scripts allow-same-origin'
      ></iframe>
    </div>
  );
};

export default CmsManagementEmbed;
