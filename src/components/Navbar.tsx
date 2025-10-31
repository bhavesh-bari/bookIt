"use client";
import Image from "next/image";
import { useState } from "react";

interface NavbarProps {
    onSearch?: (query: string) => void; // ✅ made optional
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (onSearch) {
            // ✅ only call if provided
            onSearch(searchTerm.trim());
        }
    };

    return (
        <div>
            {/* Desktop Navbar */}
            <nav className="w-full justify-between items-center px-6 sm:px-8 py-3 bg-white shadow-md sticky top-0 z-50 hidden md:flex">
                {/* Logo */}
                <div className="flex items-center">
                    <div className="relative w-20 h-16 flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Highway Delite Logo"
                            fill
                            className="object-contain transition-all duration-300"
                            priority
                        />
                    </div>
                </div>

                {/* Search bar (only if onSearch exists) */}
                {onSearch && (
                    <div className="flex items-center gap-2 w-full max-w-[350px] h-12">
                        <input
                            type="text"
                            placeholder="Search experiences..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 bg-gray-100 outline-none text-sm p-3 text-gray-800 placeholder-gray-600 rounded-md"
                        />
                        <input
                            type="button"
                            onClick={handleSearch}
                            className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 hover:bg-yellow-500 transition-all rounded-md cursor-pointer"
                            value="Search"
                        />
                    </div>
                )}
            </nav>

            {/* Mobile Navbar */}
            <nav className="w-full flex items-center px-6 sm:px-8 py-3 bg-white shadow-md sticky top-0 z-50 md:hidden transition-all">
                <div
                    className={`flex w-full items-center transition-all duration-300 ${showSearch ? "justify-center" : "justify-between"
                        }`}
                >
                    {/* Logo */}
                    {!showSearch && (
                        <div className="relative w-[50px] h-[50px] flex items-center justify-center">
                            <Image
                                src="/logo.png"
                                alt="Highway Delite Logo"
                                fill
                                className="object-contain transition-all duration-300"
                                priority
                            />
                        </div>
                    )}

                    {/* Search Input (only show if onSearch exists) */}
                    {showSearch && onSearch && (
                        <div className="flex items-center gap-2 w-full max-w-[320px] h-12">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 bg-gray-100 outline-none text-sm p-3 text-gray-800 placeholder-gray-600 rounded-md"
                            />
                            <input
                                type="button"
                                onClick={() => {
                                    handleSearch();
                                    setShowSearch(false);
                                }}
                                className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 hover:bg-yellow-500 transition-all rounded-md cursor-pointer"
                                value="Go"
                            />
                        </div>
                    )}

                    {/* Mobile search toggle button (only if onSearch exists) */}
                    {!showSearch && onSearch && (
                        <input
                            type="button"
                            onClick={() => setShowSearch(true)}
                            className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 hover:bg-yellow-500 transition-all rounded-md cursor-pointer"
                            value="Search"
                        />
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
