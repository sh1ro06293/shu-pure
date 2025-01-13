import React, { useEffect, useState } from 'react';
import { useUser } from '../components/usercontext';
import { getSaveChatRecipe, postLike } from '../components/api/api';
import { useLocation } from 'react-router-dom';
import Header from '../components/header';
import '../styles/saveRecipe.css';

const SaveChatRecipe = () => {
    const location = useLocation();
    const recipeId = location.state.recipeId;
    const { user } = useUser();
    const [messages, setMessages] = useState<any[]>([]);
    const user_id = user.id;
    const [like, setLike] = useState<boolean | null>(null); // 初期値を null に設定

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

                    // like 状態を設定
                    if (response.message?.like !== undefined) {
                        setLike(response.message.like);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, [user_id, recipeId]); // user_id と recipeId が変わったときに実行

    const onclickLike = async () => {
        const data = { recipeid: recipeId, like: !like };
        try {
            await postLike(data);
            setLike(!like); // 状態を更新
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <>
            <Header />
            <div className='saveChatRecipeContainer'>
                <button onClick={onclickLike}>
                    {like ? 'お気に入りから削除' : 'お気に入りに保存'}
                </button>
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
