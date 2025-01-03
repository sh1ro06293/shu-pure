import React ,{ useEffect, useState} from 'react';
import { useUser } from '../usercontext';
import { getSaveChatRecipeTitels } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../../styles/saveChatRecipeList.css';


const SaveChatRecipeList: React.FC = () => {

    const navigate = useNavigate();
    
    const { user } = useUser();
    const [messages, setMessages] = useState<{ message:string, id:number }[]>([]);

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

    console.log(messages);
    const onclickTitle = (id:number) => {
        // saveChatRecipe.tsxに遷移させるコードを書いて
        // その際にidを渡してあげてください
        navigate(`/saveChatRecipe/${id}`,{ state: { "recipeId": id } });

    }
 

    return (
        <div className='saveChatRecipe'>
            <h1>保存したレシピ一覧</h1>
            <div className='recpis'>
                {messages.length === 0 && <p>保存したレシピはありません</p>}
                {messages.map((message, index) => ( 
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