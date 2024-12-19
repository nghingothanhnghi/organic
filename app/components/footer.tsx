// app/components/Footer.tsx
import React from 'react';
import LogoImage from "~/assets/logo.png";
const Footer = () => {
    return (
        <footer className="bg-lime-100 text-white py-10">
            <div className="container mx-auto px-6">
                {/* Logo */}
                <div className="flex justify-center lg:justify-start mb-3">
                    <img src={LogoImage} alt="Logo" className="h-10" />
                </div>

                {/* Description about Organic */}
                <div className="text-start text-lime-900 mb-10">
                    <p className="text-lg font-semibold">Committed to Organic Growth</p>
                    <p className="text-yellow-950 text-sm">
                        We believe in the power of nature to provide high-quality, eco-friendly products that promote sustainability and health.
                    </p>
                </div>

                {/* Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Column 1 */}
                    <div>
                        <h4 className="text-lime-900 font-semibold text-sm mb-3">Company</h4>
                        <ul>
                            <li><a href="#" className="text-yellow-950 hover:text-yellow-800 text-sm">About Us</a></li>
                            <li><a href="#" className="text-yellow-950 hover:text-yellow-800 text-sm">Careers</a></li>
                            <li><a href="#" className="text-yellow-950 hover:text-yellow-800 text-sm">Press</a></li>
                            <li><a href="#" className="text-yellow-950 hover:text-yellow-800 text-sm">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-lime-900 font-semibold text-sm mb-3">Support</h4>
                        <ul>
                            <li><a href="#" className="text-yellow-950 hover:text-yellow-800 text-sm">Help Center</a></li>
                            <li><a href="#" className="text-yellow-950 hover:text-yellow-800 text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-yellow-950 hover:text-yellow-800 text-sm">Terms of Service</a></li>
                            <li><a href="#" className="text-yellow-950 hover:text-yellow-800 text-sm">Returns & Exchanges</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-lime-900 font-semibold text-sm mb-3">Follow Us</h4>
                        <ul>
                            <li><a href="#" className="text-yellow-950 hover:text-yellow-800 text-sm">Facebook</a></li>
                            <li><a href="#" className="text-yellow-950 hover:text-yellow-800 text-sm">Twitter</a></li>
                            <li><a href="#" className="text-yellow-950 hover:text-yellow-800 text-sm">Instagram</a></li>
                            <li><a href="#" className="text-yellow-950 hover:text-yellow-800 text-sm">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 border-t border-lime-400 pt-10 text-center">
                    <p className="text-yellow-950 text-sm">© 2024 Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
