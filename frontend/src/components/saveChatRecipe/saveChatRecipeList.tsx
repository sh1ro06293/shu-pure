import React ,{ useEffect, useState} from 'react';
import { useUser } from '../usercontext';
import { getSaveChatRecipe } from '../api/api';



const SaveChatRecipeList: React.FC = () => {
    
    const { user } = useUser();
    const [messages, setMessages] = useState<{ message:string }[]>([]);

    const user_id = user.id;
    useEffect(() => {
        const fetchData = async () => {
            if (user_id !== null) {
                const response = await getSaveChatRecipe(user_id);
                console.log(response);
                setMessages(response);
            } else {
                console.error('User ID is null');
            }
        };
        fetchData();
    }, [user_id]);

    console.log(messages);
    const onclickTitle = (index:number) => {

    }
 

    return (
        <>
            <h1>保存したレシピ</h1>
            <div>
                {messages.map((message, index) => ( 
                    <div key={index}>
                        <button onClick={() => onclickTitle(index)}>
                        {message.message}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );

};

export default SaveChatRecipeList;