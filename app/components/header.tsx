// components/Header.tsx
import { Link, useLocation } from "react-router";
import { useState } from "react";
import { useOffCanvas } from "~/hooks/useOffCanvas";
import CartList from "./cartList";
import CartButton from "./cartButton";
import WishlistButton from "./wishListButton";
import ProceedToCheckoutButton from "./proceedToCheckoutButton";
import CartSummary from "./cartSummary";

const Header = () => {
    const { isOpen: isCartOpen, toggle: toggleCart, open: openCart, close: closeCart } = useOffCanvas();
    const { isOpen: isMenuOpen, toggle: toggleMenu, open: openMenu, close: closeMenu } = useOffCanvas();

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
                    <Link to="/">BrandName</Link>
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
                        className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Register
                    </Link>
                    {!shouldHideCartButton && <CartButton onClick={toggleCart} />}
                    <WishlistButton wishlistCount={3} />
                </div>
            </div>
            {/* Off-canvas for Cart */}
            <div
                className={`fixed flex-column top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"} z-50`}
            >
                <div className="flex justify-between p-4 border-b border-gray-300">
                    <div className="font-bold text-lg">Your Cart</div>
                    <button onClick={toggleCart} className="text-gray-700">
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                {/* Cart content goes here */}
                <div className="flex-shrink-0">
                    <CartList />
                </div>
                <div>
                    <CartSummary taxRate={10} shippingFee={15} />
                    <ProceedToCheckoutButton closeCart={closeCart} />
                </div>

            </div>
            {/* Mobile Off-canvas Navigation Menu */}
            <nav
                className={`fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } md:hidden z-50`}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300">
                    <div className="text-lg font-bold">Menu</div>
                    <button onClick={toggleMenu} className="text-gray-700">
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <ul className="flex flex-col items-start space-y-4 mt-4 px-4">
                    <li>
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-gray-900 transition-colors"
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/store"
                            className="text-gray-700 hover:text-gray-900 transition-colors"
                            onClick={toggleMenu}
                        >
                            Store
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="text-gray-700 hover:text-gray-900 transition-colors"
                            onClick={toggleMenu}
                        >
                            About
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Backdrop */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleMenu}
                ></div>
            )}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-0 z-40"
                    onClick={toggleCart}
                ></div>
            )}
        </header>
    );
};

export default Header;

