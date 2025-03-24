// components/Header.tsx
import { Link, useLocation } from "react-router";
import { useState, useTransition } from "react";
import LogoImage from "~/assets/logo.png";
import { useOffCanvas } from "~/hooks/useOffCanvas";
import useResponsive from "~/hooks/useResponsive";
import CartButton from "./cartButton";
import WishlistButton from "./wishListButton";
import CartOffCanvas from "./cartOffCanvas";
import MobileMenuOffCanvas from "./mobileMenuOffCanvas";
import TopNavBar from "./topNavBar";
import MainMenuDesktop from "./mainMenuDesktop";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { isMobile, isTablet, isDesktop } = useResponsive();
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
            {isDesktop && <TopNavBar />}
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-3 sm:py-4 sm:px-6">

                <div className="flex items-center space-x-2">
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
                    {/* Brand */}
                    <div className="text-2xl font-bold">
                        <Link to="/"><img src={LogoImage} width={100} height={40} className="img-fluid" /></Link>
                    </div>
                </div>

                {/* Centered Navigation Menu */}
                <MainMenuDesktop />

                {/* Right Side Buttons */}
                <div className="flex items-center space-x-2">
                    {!shouldHideCartButton && <CartButton onClick={toggleCart} />}
                    <WishlistButton />
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

