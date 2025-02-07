import React, {useState } from 'react';

import SaveChatRecipeList from '../components/saveChatRecipe/saveChatRecipeList';
import Header from '../components/header';
import '../styles/chatRecipeHistory.css';



const ChatRecipeHistory: React.FC= ({ }) => {
    return (
        <div className="chatRecipeHistory">
            <Header />
            <div className="content">
                <SaveChatRecipeList filter={true}/>
            </div>
        </div>
    );
}

export default ChatRecipeHistory;
