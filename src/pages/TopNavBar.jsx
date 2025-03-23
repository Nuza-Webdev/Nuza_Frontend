import React, { useState, useEffect } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoListCircleOutline } from "react-icons/io5";
import { PiLineVertical } from "react-icons/pi";
import { FaFilter } from "react-icons/fa";
import ListCircleDropdown from "./ListCircleDropdown";
import ProfileDropdown from "./ProfileDropdown";
import LogoImg from "../../public/NUZA-logo.png";
const TopNavBar = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  // useEffect(() => {
  //     const handleScroll = () => {
  //         if (window.scrollY > 170) {
  //             setIsScrolled(true);
  //         } else {
  //             setIsScrolled(false);
  //         }
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });

        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        
        const data = await response.json();
        if (data && data.address) {
          setLocation(data.address.county || 'Location not found');
        } else {
          setLocation('Location not found');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocation('Location not available');
      }
    };

    fetchLocation();
    
    // Check authentication status from localStorage or your auth system
    const token = localStorage.getItem('token');
    setIsSignedIn(!!token);
  }, []);
  return (
    <nav className="bg-[#7B6DFF] shadow-lg">
      {/* Top Bar */}
      {!isScrolled && (
        <div className="flex justify-between items-center px-6 py-4">
          <ListCircleDropdown />
          <ProfileDropdown isSignedIn={isSignedIn} />
        </div>
      )}

      {/* NUZA Branding */}
      {!isScrolled && (
        <div className="flex flex-col items-center text-center py-4">
          <h1 className="text-white font-cinzelDecorative text-3xl font-bold tracking-wide">
            <img src={LogoImg} alt="" className="w-40 h-auto" />
          </h1>

          <p className="text-white text-lg font-medium mt-2">
            Discover the best beauty and wellness services
          </p>
        </div>
      )}

      {/* Search and Location Section */}
      {!isScrolled && (
        <div className="flex justify-center w-full">
          <div className="flex w-2/3 items-center px-6 py-4 gap-1">
            <div className="relative flex-1 bg-white rounded-full border border-purple-300 flex items-center px-4 py-2">
              <div className="flex items-center text-indigo-600 cursor-pointer">
                <FiMapPin className="text-xl mr-2" />
                <span className="text-sm font-medium">{location}</span>
                <PiLineVertical className="ml-2 text-4xl text-indigo-600" />
              </div>
              <input
                type="text"
                placeholder="Search for services / venues / professionals"
                className="w-full pl-4 pr-8 py-2 text-sm border-none focus:ring-0 focus:outline-none"
              />
              <FiSearch className="absolute right-4 text-lg text-indigo-600 transform hover:scale-110 transition-transform duration-200" />
            </div>
            {/* <button className="text-white text-2xl ml-4">
                            <span className="inline-block transform">
                                <FaFilter />
                            </span>
                        </button> */}
          </div>
        </div>
      )}

      {isScrolled && (
        <div className="bg-purple-950 shadow-lg fixed top-0 left-0 right-0 w-full flex justify-between items-center px-6 py-4 transition-all duration-1000">
          <button className="text-white text-4xl">
            <IoListCircleOutline />
          </button>
          <input
            type="text"
            placeholder="Search for services, venues, or professionals..."
            className="w-1/2 px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
          />
          <button className="text-white text-4xl">
            <CgProfile />
          </button>
        </div>
      )}
    </nav>
  );
};

export default TopNavBar;
