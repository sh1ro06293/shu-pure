import React, { useEffect, useRef } from 'react';
import ChatMessage from './chatMessage';


interface ChatMessagesListProps {
    messages: { role: string; content: string }[];
}

const ChatMessagesList: React.FC<ChatMessagesListProps> = ({messages}) => {
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    
    return (
        <div ref={chatContainerRef} className='chatMessage'>
            {messages.map((message, index) => (
                    <ChatMessage message={message} index={index} key={index}/>
                ))}
        </div>
    );
}

export default ChatMessagesList;
