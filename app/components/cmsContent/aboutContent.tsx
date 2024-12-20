// app/components/cmsContent/aboutContent.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchContent } from '~/features/contentSlice';

const AboutContent = () => {
    const dispatch = useAppDispatch();
    const { sections, loading, error } = useAppSelector(state => state.sections);
  
    useEffect(() => {
      // Fetch content on component mount
      dispatch(fetchContent({ page: 1, pageSize: 1, filters: { category: '' } }));
    }, [dispatch]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            {sections.map((section) => (
              <div key={section.id}>
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  {section.heading}
                </h2>
                <p className="mb-4">This is dynamic content for the section with ID: {section.id}</p>
                              {/* Filter and display link with id: 1 */}
              {section.links
                .filter(link => link.id === 1)
                .map((link) => (
                  <div key={link.id}>
                    <h3>{link.name}</h3>
                    <p>{link.description || "No description available."}</p>
                    {link.url && <a href={link.url} target="_blank" rel="noopener noreferrer">Visit Link</a>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    );
  };

export default AboutContent;
