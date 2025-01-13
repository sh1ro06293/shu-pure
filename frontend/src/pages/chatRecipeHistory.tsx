import React, {useState } from 'react';

import SaveChatRecipeList from '../components/saveChatRecipe/saveChatRecipeList';
import Header from '../components/header';



const ChatRecipeHistory: React.FC= ({ }) => {
    
    const [like, setLike] = useState(false);

    const onchangeLike = () => {
        setLike(!like);
        console.log(like);
    }

    return (
        <>
        <Header />
        <button onClick={() => onchangeLike()}>
            {like ? '全て' : 'お気に入り'}
        </button>
        <SaveChatRecipeList filter={like}/>
        </>
    );
}

export default ChatRecipeHistory;
