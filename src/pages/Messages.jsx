import React from "react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
    const navigate = useNavigate();

    // Dummy chat data
    const chats = [
        { id: 1, name: "Green Trends", lastMessage: "Hi! May I know about your offers?" },
        { id: 2, name: "Kavitha Stylist", lastMessage: "Yes mam…" },
    ];

    // Function to navigate to chat page
    const openChat = (id) => {
        navigate(`/chat/${id}`); // Navigate to chat page for this user
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Messages</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
                {chats.map((chat) => (
                    <div 
                        key={chat.id} 
                        className="border-b p-3 cursor-pointer hover:bg-gray-100"
                        onClick={() => openChat(chat.id)}
                    >
                        <h3 className="text-lg font-semibold">{chat.name}</h3>
                        <p className="text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Messages;
