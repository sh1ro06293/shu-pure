import React, { useEffect, useState } from 'react';
import { useUser } from '../components/usercontext';
import { getSaveChatRecipe } from '../components/api/api';
import { useLocation } from 'react-router-dom';
import Header from '../components/header';
import '../styles/saveRecipe.css';

const SaveChatRecipe = () => {
    const location = useLocation();
    const recipeId = location.state.recipeId;
    const { user } = useUser();
    const [messages, setMessages] = useState<any[]>([]);
    const user_id = user.id;

    useEffect(() => {

        const fetchData = async () => {
            if (user_id) {
                const data = { user_id: user_id, recipeid: recipeId };
                try {
                    const response = await getSaveChatRecipe(data);

                    // 重複を避けてセット
                    setMessages(prevMessages => {
                        if (!prevMessages.some(msg => JSON.stringify(msg) === JSON.stringify(response.message))) {
                            return [...prevMessages, response.message];
                        }
                        return prevMessages;
                    });
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <Header />
        <div className='saveChatRecipeContainer'>
            {messages.map((message, index) => (
                typeof message === 'string' ? (
                    <h1 key={index}>{message}</h1>
                ) : (
                    <div key={index} className='content'>
                        <h2>{message.title}</h2>
                        <h3>材料</h3>
                        <p dangerouslySetInnerHTML={{ __html: message.food.replace(/\r?\n/g, '<br>') }} />
                        <h3>作り方</h3>
                        <p dangerouslySetInnerHTML={{ __html: message.recipe.replace(/\r?\n/g, '<br>') }} />

                        <h3>合うお酒</h3>
                        <p dangerouslySetInnerHTML={{ __html: message.drink.replace(/\r?\n/g, '<br>') }} />
                    </div>
                )
            ))}
        </div>
            </>
    );
};

export default SaveChatRecipe;
