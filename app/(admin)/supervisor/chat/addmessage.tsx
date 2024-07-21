// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { useChat } from './context';

// interface AddMessageFormProps {
//     supervisorId: string;
//     season: string;
// }

// const AddMessageForm: React.FC<AddMessageFormProps> = ({ supervisorId, season }) => {
//     const [message, setMessage] = useState<string>('');
//     const { addMessage } = useChat();

//     const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//         setMessage(e.target.value);
//     };

//     const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         addMessage(supervisorId, season, 'senderIdHere', message); // Replace 'senderIdHere' with actual sender ID
//         setMessage('');
//     };

//     return (
//         <form onSubmit={handleSendMessage}>
//             <div>
//                 <label htmlFor="message">Message:</label>
//                 <textarea
//                     id="message"
//                     value={message}
//                     onChange={handleMessageChange}
//                     placeholder="Type your message here"
//                     title="Type your message in this field"
//                     rows={4}
//                     cols={50}
//                 />
//             </div>
//             <button type="submit" title="Send your message">Send Message</button>
//         </form>
//     );
// };

// export default AddMessageForm;
