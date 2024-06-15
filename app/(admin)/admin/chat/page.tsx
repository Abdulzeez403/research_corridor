
"use client"
import { Message, UserData, userData } from '@/constant/data';
import React, { useState } from 'react'
import { ChatList } from './chat_list';
import ChatTopbar from './chat_topbar';

interface ChatProps {
    messages?: Message[];
    selectedUser: UserData;
    isMobile: boolean;
}


function ChatPage({ messages, selectedUser, isMobile }: ChatProps) {

    const [messagesState, setMessages] = useState<Message[]>(
        messages ?? []
    );

    const sendMessage = (newMessage: Message) => {
        setMessages([...messagesState, newMessage]);
    };
    return (

        <div className="flex flex-col justify-between w-full h-full">
            <ChatTopbar selectedUser={selectedUser} />

            <ChatList
                messages={userData as any}
                selectedUser={selectedUser}
                sendMessage={sendMessage}
                isMobile={isMobile}
            />

        </div>
    )
}

export default ChatPage