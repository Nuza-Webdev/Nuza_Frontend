import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/NUZA-logo.png"
const Navbar = () => {
    return (
        <nav className="bg-[#7B6DFF] text-white p-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
        <img src={logo} alt="Logo" className="h-8" /> {/* Replace with your image path */}
        <div className="space-x-4">
            <Link to="/" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </div>
    </div>
</nav>


    );
};

export default Navbar;
