import React, { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(239);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handlePayment = async (method) => {
        setIsLoading(true);
        setError(null);
        setPaymentMethod(method);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Here you would integrate with your actual payment gateway
            // For example, Razorpay, Stripe, etc.
            
            // For demo purposes, we'll just simulate a successful payment
            console.log(`Processing ${method} payment...`);
            
            // Navigate to success page or show success message
            alert('Payment successful!');
            navigate('/dashboard');
        } catch (err) {
            setError('Payment failed. Please try again.');
            console.error('Payment error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (error) {
        return (
            <div className="p-10 flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <div className="text-red-500 text-center mb-4">{error}</div>
                    <button
                        onClick={() => setError(null)}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-10 flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Your Bill</h2>
                <div className="border-b pb-4 mb-4">
                    <p className="text-gray-700 mb-2">Bill Amount: ₹265</p>
                    <p className="text-gray-700 mb-2">Discount: ₹26</p>
                    <p className="text-gray-800 font-semibold">
                        Total Payable: <span className="text-green-500">₹{amount}</span>
                    </p>
                </div>

                <h3 className="text-xl font-bold mb-4">Select Payment Option</h3>
                <div className="space-y-4">
                    <button
                        className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition ${
                            isLoading && paymentMethod === 'card' ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => handlePayment('card')}
                        disabled={isLoading && paymentMethod === 'card'}
                    >
                        {isLoading && paymentMethod === 'card' ? 'Processing...' : 'Pay with Card'}
                    </button>
                    <button
                        className={`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition ${
                            isLoading && paymentMethod === 'upi' ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => handlePayment('upi')}
                        disabled={isLoading && paymentMethod === 'upi'}
                    >
                        {isLoading && paymentMethod === 'upi' ? 'Processing...' : 'Pay with UPI'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
