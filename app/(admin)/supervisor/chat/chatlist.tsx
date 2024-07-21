import React, { useEffect } from 'react';
import { useChat } from './context';

interface IProps {
    supervisorId: string;
    season: string;
}

const ChatList: React.FC<IProps> = ({ supervisorId, season }) => {
    const { chats, loading, error, fetchChats, socket } = useChat();

    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', { supervisorId, season });
        }
        fetchChats(supervisorId, season);

        return () => {
            if (socket) {
                socket.off('message');
            }
        };
    }, [supervisorId, season, fetchChats, socket]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!chats || !chats.messages) return <p>No messages available.</p>;

    return (
        <div>
            {chats.messages.map((msg, index) => (
                <div key={index}>
                    <strong>{msg.senderId.name}: </strong>{msg.message}
                </div>
            ))}
        </div>
    );
};

export default ChatList;
