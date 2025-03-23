import React, { useRef, useState, useEffect } from "react";
import { AiOutlineFilter } from "react-icons/ai"; // Filter icon
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"; // Arrow icons
import FilterPopup from "./FilterPopup"; // Importing the popup component

const Categories = () => {
    const categories = [
        { name: "Hair & Styling", icon: "💇" },
        { name: "Mehendi", icon: "🌿"},
        { name: "Skincare", icon: "🧴" },
        { name: "Facials", icon: "🧖" },
        { name: "Spa", icon: "🛀" },
        { name: "Nails", icon: "💅" },
        { name: "Fitness", icon: "💪" },
        { name: "Professionals", icon: "👨‍💼" },
        { name: "Makeup", icon: "💄" },
        { name: "Bridal", icon: "👰" },
        { name: "Pedicure&Manicure", icon: "🖌️" },
    ];

    const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollContainerRef = useRef(null);

    // Check scroll position
    const checkScrollPosition = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(
                container.scrollLeft < container.scrollWidth - container.clientWidth
            );
        }
    };

    // Add scroll event listener
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            return () => container.removeEventListener('scroll', checkScrollPosition);
        }
    }, []);

    // Scroll left
    const scrollLeft = () => {
        if (scrollContainerRef.current && canScrollLeft) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    // Scroll right
    const scrollRight = () => {
        if (scrollContainerRef.current && canScrollRight) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    if (error) {
        return (
            <div className="bg-gray-50 py-4 px-4 shadow-md">
                <div className="text-red-500 text-center">Error loading categories: {error}</div>
            </div>
        );
    }

    return (
        <div>
            {/* Categories and Filter Button */}
            <div className="flex items-center bg-gray-50 py-4 px-4 shadow-md">
                {/* Scrollable Categories Section */}
                <div className="w-5/6 flex items-center relative">
                    {/* Left Arrow */}
                    <button
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                        className={`absolute left-0 z-10 bg-gray-50 border rounded-full p-2 text-gray-600 hover:shadow-lg transition ${
                            !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <IoIosArrowBack size={20} />
                    </button>

                    {/* Scrollable Categories */}
                    <div
                        ref={scrollContainerRef}
                        className="flex items-center space-x-4 overflow-x-auto scrollbar-hide w-full mx-10"
                    >
                        {isLoading ? (
                            <div className="w-full text-center">Loading categories...</div>
                        ) : (
                            categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center cursor-pointer flex-shrink-0 w-[100px] space-y-2"
                                >
                                    <div className="w-14 h-14 flex items-center justify-center bg-gray-50 rounded-full">
                                        <span className="text-2xl">{category.icon}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 font-medium">{category.name}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        className={`absolute right-0 z-10 bg-grey-50 border rounded-full p-2 text-gray-600 hover:shadow-lg transition ${
                            !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <IoIosArrowForward size={20} />
                    </button>
                </div>

                {/* Filters Button Section */}
                <div className="w-1/6 flex justify-center">
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-gray-600 hover:shadow-md transition-shadow"
                    >
                        <AiOutlineFilter className="text-xl" />
                        <span className="text-sm font-medium">Filters</span>
                    </button>
                </div>
            </div>

            {/* Popup */}
            <FilterPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
    );
};

export default Categories;
