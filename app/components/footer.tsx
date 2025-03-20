// app/components/Footer.tsx
import React from 'react';
import LogoImage from "~/assets/logo.png";
import CompanySection from './footerSection/companySection';
import SupportSection from './footerSection/supportSection';
import FollowUsSection from './footerSection/followUs.Section';
const Footer = () => {
    return (
        <footer className="bg-orange-950 text-slate-300 pt-10">
            <div className="container mx-auto px-3 pt-10 sm:px-6">
                <div className='grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16 lg:gap-x-40 mb-20'>
                    <div className="col-span-2">
                        {/* Logo */}
                        <div className="flex justify-center lg:justify-start mb-3">
                            <img src={LogoImage} alt="Logo" className="h-10" />
                        </div>

                        {/* Description about Organic */}
                        <div className="text-center lg:text-start mb-10">
                            <p className="text-white text-lg font-semibold mb-3">Committed to Organic Growth</p>
                            <p className=" text-sm">
                                We believe in the power of nature to provide high-quality, eco-friendly products that promote sustainability and health.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                        <form className="w-full">
                            <label htmlFor="UserEmail" className="sr-only"> Email </label>
                            <div
                                className="border border-orange-900 p-2 focus-within:ring sm:flex sm:items-center sm:gap-4"
                            >
                                <input
                                    type="email"
                                    id="UserEmail"
                                    placeholder="john@rhcp.com"
                                    className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                                />

                                <button
                                    className="mt-1 w-full px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none bg-orange-900 hover:bg-orange-800 sm:mt-0 sm:w-auto sm:shrink-0"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


                {/* Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-10">
                    {/* Column 1 */}
                    <CompanySection/>
                    {/* Column 2 */}
                    <SupportSection />
                    {/* Column 3 */}
                    <FollowUsSection/>
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
