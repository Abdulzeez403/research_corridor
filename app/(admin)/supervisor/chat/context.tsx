// "use client"
// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import io, { Socket } from 'socket.io-client';
// import axios from 'axios';
// import Cookies from 'universal-cookie';



// interface IMessage {
//     senderId: { name: string };
//     message: string;
//     timestamp: number;
// }

// interface IChat {
//     supervisorId: string;
//     season: string;
//     messages: IMessage[];
// }

// interface IChatContext {
//     chats: IChat | null;
//     loading: boolean;
//     error: string | null;
//     fetchChats: (supervisorId: string, season: string) => void;
//     addMessage: (supervisorId: string, season: string, senderId: string, message: string) => void;
//     socket: Socket | null;
// }

// const ChatContext = createContext<IChatContext | undefined>(undefined);

// export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [chats, setChats] = useState<IChat | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const cookies = new Cookies();
//     const port = "https://research-corridor.onrender.com";
//     const token = cookies.get("token");



//     useEffect(() => {
//         const newSocket = io(port);
//         setSocket(newSocket);

//         return () => {
//             newSocket.disconnect();
//         };
//     }, []);

//     const fetchChats = async (supervisorId: string, season: string) => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`${port}/api/chat/${supervisorId}/${season}`, {
//                 headers: {
//                     'x-auth-token': token,
//                 },
//             });
//             setChats(response.data);
//         } catch (err: any) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const addMessage = async (supervisorId: string, season: string, senderId: string, message: string) => {
//         try {
//             await axios.post(`${port}/api/chat/${supervisorId}/${season}`, {
//                 senderId,
//                 message
//             }, {
//                 headers: {
//                     'x-auth-token': token,
//                 },
//             })
//             if (socket) {
//                 socket.emit('chatMessage', { supervisorId, season, senderId, message });
//             }
//             fetchChats(supervisorId, season);
//         } catch (err: any) {
//             setError(err.message);
//         }
//     };

//     useEffect(() => {
//         if (socket) {
//             socket.on('message', (message: any) => {
//                 // Handle incoming messages
//                 setChats(prevChats => {
//                     if (prevChats) {
//                         return {
//                             ...prevChats,
//                             messages: [...prevChats.messages, message]
//                         };
//                     }
//                     return prevChats;
//                 });
//             });
//         }
//     }, [socket]);

//     return (
//         <ChatContext.Provider value={{ chats, loading, error, fetchChats, addMessage, socket }}>
//             {children}
//         </ChatContext.Provider>
//     );
// };

// export const useChat = (): IChatContext => {
//     const context = useContext(ChatContext);
//     if (context === undefined) {
//         throw new Error('useChat must be used within a ChatProvider');
//     }
//     return context;
// };
