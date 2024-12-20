// components/Header.tsx
import { Link, useLocation } from "react-router";
import { useState, useTransition } from "react";
import LogoImage from "~/assets/logo.png";
import { useOffCanvas } from "~/hooks/useOffCanvas";
import CartButton from "./cartButton";
import WishlistButton from "./wishListButton";
import CartOffCanvas from "./cartOffCanvas";
import MobileMenuOffCanvas from "./mobileMenuOffCanvas";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { isOpen: isCartOpen, toggle: toggleCart, open: openCart, close: closeCart } = useOffCanvas();
    const { isOpen: isMenuOpen, toggle: toggleMenu, open: openMenu, close: closeMenu } = useOffCanvas();

    const { t } = useTranslation();

    // Get the current route
    const location = useLocation();

    // Define routes where the CartButton should be hidden
    const hideCartButtonRoutes = ["/cart", "/checkout"];
    const shouldHideCartButton = hideCartButtonRoutes.includes(location.pathname);

    return (
        <header className="bg-gray-100 border-b border-gray-300">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Brand */}
                <div className="text-2xl font-bold">
                    <Link to="/"><img src={LogoImage} width={100} height={40} className="img-fluid" /></Link>
                </div>

                {/* Centered Navigation Menu */}
                <nav className="hidden md:flex space-x-6 lg:order-first">
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        to="/store"
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        Store
                    </Link>
                    <Link
                        to="/about"
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        About
                    </Link>
                </nav>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden text-gray-700 focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                                isMenuOpen
                                    ? "M6 18L18 6M6 6l12 12" // Close icon (X)
                                    : "M4 6h16M4 12h16m-7 6h7" // Hamburger icon
                            }
                        />
                    </svg>
                </button>

                {/* Right Side Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link
                        to="/register"
                        className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                    >
                        <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            {t("btn.check_order")}
                        </span>
                    </Link>
                    {!shouldHideCartButton && <CartButton onClick={toggleCart} />}
                    <WishlistButton wishlistCount={3} />
                </div>
            </div>
            {/* Off-canvas for Cart */}
            <CartOffCanvas
                isOpen={isCartOpen}
                toggleCart={toggleCart}
                closeCart={closeCart}
            />
            {/* Mobile Off-canvas Navigation Menu */}
            <MobileMenuOffCanvas isOpen={isMenuOpen} toggleMenu={toggleMenu} />
            {/* Mobile Off-canvas Navigation Menu */}

        </header>
    );
};

export default Header;

