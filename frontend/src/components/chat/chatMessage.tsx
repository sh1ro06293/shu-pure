import React, { useState } from 'react';
import { useUser } from '../usercontext';
import { saveRecipe } from '../api/api';

interface ChatMessageProps {
    message: { role: string; content: string };
    index: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, index }) => {
    const { user } = useUser();
    const [isSaved, setIsSaved] = useState(false);

    const onSave = async (message: string) => {
        const data = JSON.stringify({ "message": message, "user_id": user.id });
        console.log(data);
        const response = await saveRecipe(data);
        console.log(response);
        setIsSaved(true);
    };

    return (
        <>
            {message.role === 'assistant' ? (
                <div key={index} className={message.role}>
                    {message.content}
                    {!isSaved && (
                        <button onClick={() => onSave(message.content)}>レシピを保存する</button>
                    )}
                </div>
            ) : (
                <div key={index} className={message.role}>{message.content}</div>
            )}
        </>
    );
}

export default ChatMessage;
