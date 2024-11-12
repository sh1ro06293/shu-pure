import React from 'react';
import ChatMessage from './chatMessage';


interface ChatMessagesListProps {
    messages: { role: string; content: string }[];
}

const ChatMessagesList: React.FC<ChatMessagesListProps> = ({messages}) => {
    
    return (
        <>
            {messages.map((message, index) => (
                    <ChatMessage message={message} index={index} key={index}/>
                ))}
        </>
    );
}

export default ChatMessagesList;
