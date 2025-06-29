// app/components/Footer.tsx
import React from 'react';
import LogoImage from "~/assets/logo.png";
import ContactSection from './footerSection/contactSection';
import CompanySection from './footerSection/companySection';
import SupportSection from './footerSection/supportSection';
import FollowUsSection from './footerSection/followUs.Section';
import SubcribeSection from './footerSection/subcribeSection';
const Footer = () => {
    return (
        <footer className="bg-orange-950 text-slate-300 pt-10">
            <div className="max-w-screen-xl mx-auto px-3 pt-10 sm:px-6">
                {/* Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:flex gap-5 sm:gap-8 mb-10">
                    <div className="lg:w-2/5 lg:pe-10">
                        {/* Logo */}
                        <div className="flex justify-center lg:justify-start mb-3">
                            <img src={LogoImage} alt="Logo" className="h-10" />
                        </div>
                        {/* Description about Organic */}
                        <ContactSection />
                    </div>
                    {/* Remaining Columns (3 equal columns on lg) */}
                    <div className="lg:w-1/6">
                        <CompanySection />
                    </div>
                    <div className="lg:w-1/6">
                        <SupportSection />
                    </div>
                    <div className="lg:w-1/3">
                        <FollowUsSection />
                        <SubcribeSection />
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 border-t border-orange-900 py-5 text-center">
                    <div className="sm:flex sm:justify-between">
                        <p className="text-xs text-slate-300">&copy; 2022. Company Name. All rights reserved.</p>
                        <ul className="mt-3 sm:mt-0 flex flex-wrap justify-center gap-4 text-xs sm:justify-start lg:justify-end">
                            <li>
                                <a href="#" className="text-gray-500 transition hover:opacity-75">
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 transition hover:opacity-75">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-500 transition hover:opacity-75">
                                    Cookies
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
