import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Chat = () => {
    const { id } = useParams(); // Get chat ID from URL
    const navigate = useNavigate();

    // Dummy messages for each chat
    const chatData = {
        1: {
            name: "Green Trends",
            messages: [
                { sender: "user", text: "Hi! May I know about your offers?" },
                { sender: "company", text: "Yes, we have a 10% discount today!" }
            ]
        },
        2: {
            name: "Kavitha Stylist",
            messages: [
                { sender: "user", text: "Can I book a hair spa session?" },
                { sender: "company", text: "Yes, we are available this weekend!" }
            ]
        }
    };

    const chat = chatData[id];

    if (!chat) {
        return <p>Chat not found</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => navigate("/messages")} className="text-blue-500">← Back</button>
                <h2 className="text-2xl font-bold">{chat.name}</h2>
                <div></div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
                {chat.messages.map((msg, index) => (
                    <div key={index} className={`p-2 my-2 rounded-lg ${msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;
