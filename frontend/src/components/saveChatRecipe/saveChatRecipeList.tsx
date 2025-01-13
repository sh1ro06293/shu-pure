import React, { useEffect, useState } from 'react';
import { useUser } from '../usercontext';
import { getSaveChatRecipeTitels } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../../styles/saveChatRecipeList.css';

interface SaveChatRecipeListProps {
    filter: boolean;
}

const SaveChatRecipeList: React.FC<SaveChatRecipeListProps> = ({ filter }) => {

    const navigate = useNavigate();
    const { user } = useUser();
    const [messages, setMessages] = useState<{ message: string; id: number; like: boolean }[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<{ message: string; id: number; like: boolean }[]>([]);

    const user_id = user.id;

    useEffect(() => {
        const fetchData = async () => {
            if (user_id !== null) {
                const response = await getSaveChatRecipeTitels(user_id);
                console.log(response);
                setMessages(response);
            } else {
                console.error('User ID is null');
            }
        };
        fetchData();
    }, [user_id]);

    useEffect(() => {
        // フィルターに応じたメッセージの絞り込み
        if (filter) {
            setFilteredMessages(messages.filter((message) => message.like));
        } else {
            setFilteredMessages(messages);
        }
    }, [filter, messages]);

    const onclickTitle = (id: number) => {
        navigate(`/saveChatRecipe/${id}`, { state: { recipeId: id } });
    };

    return (
        <div className='saveChatRecipe'>
            {filter ? <h1>お気に入りしたレシピ一覧</h1> : <h1>保存したレシピ一覧</h1>}
            <div className='recpis'>
                {filteredMessages.length === 0 && (
                    <p>{filter ? 'お気に入りのレシピはありません' : '保存したレシピはありません'}</p>
                )}
                {filteredMessages.map((message, index) => (
                    <div key={index} className='recipe'>
                        <button onClick={() => onclickTitle(message.id)}>
                            {message.message}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SaveChatRecipeList;
