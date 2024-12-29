// app/components/Footer.tsx
import React from 'react';
import LogoImage from "~/assets/logo.png";
const Footer = () => {
    return (
        <footer className="bg-orange-950 text-slate-300 pt-10">
            <div className="container mx-auto px-6 pt-10">
                <div className='grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16 mb-8'>
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

                    </div>
                </div>


                {/* Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {/* Column 1 */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
                        <ul>
                            <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">About Us</a></li>
                            <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">Careers</a></li>
                            <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">Press</a></li>
                            <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-3">Support</h4>
                        <ul>
                            <li><a href="#" className="text-slate-300 hover:text-orange-900 text-sm">Help Center</a></li>
                            <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">Terms of Service</a></li>
                            <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">Returns & Exchanges</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-3">Follow Us</h4>
                        <ul>
                            <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">Facebook</a></li>
                            <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">Twitter</a></li>
                            <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">Instagram</a></li>
                            <li><a href="#" className="text-slate-300 hover:bg-orange-900 text-sm">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 border-t border-orange-900 py-5 text-center">
                    <p className="text-slate-300 text-sm">© 2024 Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
