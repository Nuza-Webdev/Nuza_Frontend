import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa"; // Import Messages Icon
import NearYou from "./nearYou";

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);   

    const offers = [
        { id: 1, title: "Flat 10% Off", description: "Avail flat 10% off on Naturals services." },
        { id: 2, title: "₹100 Off on First Booking", description: "Get ₹100 off on your first booking at Green Trends." },
        { id: 3, title: "20% Off", description: "Enjoy 20% off on Tony & Guy services." },
        { id: 4, title: "Free Delivery", description: "Free delivery on all orders above ₹500." },
        { id: 5, title: "Buy 1 Get 1 Free", description: "Get one free when you buy one service." },
        { id: 6, title: "Free Haircut", description: "Get your first haircut for free from Tony & Guy." },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % offers.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [offers.length]);

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % offers.length);
    };

    const handleMessagesClick = () => {
        navigate("/messages");  // Redirect to Messages page when clicked
    };

    return (
        <div className="flex flex-col bg-gray-50 min-h-screen">
            
            {/* Dashboard Header with Messages Icon */}
            <div className="flex justify-between items-center p-4 bg-white shadow-md">
                <h2 className="text-3xl font-bold text-purple-600">Dashboard</h2>
                {/* Messages Icon Button */}
                <button onClick={handleMessagesClick} className="flex items-center space-x-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700">
                    <FaEnvelope className="text-xl" />
                    <span>Messages</span>
                </button>
            </div>

            {/* Other Dashboard Sections */}
            <div className="flex flex-col bg-gray-50">
                <NearYou />
            </div>

            {/* Offers Section */}
            <section className="py-8 px-6">
                <h2 className="text-3xl font-bold text-purple-600 mb-6">Offers</h2>
                <div className="flex justify-evenly">
                    {offers.slice(currentSlide, currentSlide + 3).map((offer) => (
                        <div key={offer.id} className="bg-white shadow rounded-lg overflow-hidden w-1/3 h-32 flex-shrink-0 p-4">
                            <h3 className="text-lg font-bold">{offer.title}</h3>
                            <p className="text-gray-600">{offer.description}</p>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <div className="flex justify-center mt-4">
                    <button className="bg-gray-800 text-white p-2 rounded-full mr-4" onClick={handlePrevSlide}>
                        &#8592;
                    </button>
                    <button className="bg-gray-800 text-white p-2 rounded-full" onClick={handleNextSlide}>
                        &#8594;
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
