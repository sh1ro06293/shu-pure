import React from 'react';
import { useUser } from '../usercontext';
import { getSaveChatRecipe } from '../api/api';



const SaveChatRecipeList: React.FC = () => {
    const { user } = useUser();
    const user_id = user.id;
    if (user_id !== null) {
        const response = getSaveChatRecipe(user_id);
    } else {
        console.error('User ID is null');
    }

    return <>
    
    </>;

};



export default SaveChatRecipeList;
