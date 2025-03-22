import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import PaymentPage from "./pages/PaymentPage";
import TopNavBar from "./pages/TopNavbar";
import Categories from "./pages/Categories";
import NearNuzaPage from "./pages/NearNuzaPage";
import About from "./pages/About";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";  

const App = () => {
    const location = useLocation();
    const noNavbarRoutes = ["/dashboard", "/payment", "/near-you"];

    return (
        <>
            {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/chat/:id" element={<Chat />} />  {/* Chat Page Route */}
                <Route 
                    path="/dashboard" 
                    element={
                        <>
                            <TopNavBar />
                            <Categories />
                            <Dashboard />
                        </>
                    } 
                />
                <Route path="/payment" element={
                    <>
                        <TopNavBar />
                        <Categories />
                        <PaymentPage />
                    </>                    
                } />
                <Route path="/near-you" element={
                    <>
                        <TopNavBar />
                        <Categories />
                        <NearNuzaPage />
                    </>
                } />
            </Routes>
            <Footer />
        </>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
