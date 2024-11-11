import Header from '../components/header';
import React, { useState, useEffect } from 'react';
import { postChat,saveRecipe  } from '../components/api/api';
import Modal from 'react-modal';
import NotFood from '../components/chat/notFood';
import Input from '../components/chat/input'; // Inputコンポーネントをインポート
import { useUser } from '../components/usercontext';
import ModalSaveRecipe from '../components/chat/modalSaveRecipe';


Modal.setAppElement('#root');

const Chat = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [notFoodListModalIsOpen, setnotFoodListModalIsOpen] = useState(false);
    const [saveRecipeModalIsOpen, setSaveRecipeModalIsOpen] = useState(false);
    const [notFoodList, setNotFoodList] = React.useState<string[]>([]);
    const { user } = useUser();

    const handleInputSubmit = (text: string) => {
        const newMessage = { role: 'user', content: text };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setShouldFetch(true); // 新しいメッセージが追加されたらデータフェッチをトリガー
    };

    useEffect(() => {
        const fetchData = async () => {
            if (shouldFetch) {
                    const data = notFoodList?JSON.stringify({ "messages": messages, "notFoodList": notFoodList }): JSON.stringify({ "messages": messages });

                const response = await postChat(data);
                setMessages(prevMessages => [...prevMessages, response]);
                setShouldFetch(false);
            }
        };
        fetchData();
    }, [shouldFetch, messages]);


    const onSave = async (message: string) => {
        const data = JSON.stringify({"message": message,"user_id": user.id  });
        console.log(data);
        const response = await saveRecipe(data);
        console.log(response);
    };


    return (
        <>
            <Header />
            <div className="content">
                <button onClick={() => setnotFoodListModalIsOpen(true)}>入れたくないものリスト</button>
                <button onClick={() => setSaveRecipeModalIsOpen(true)}>保存したレシピ</button>
                <Modal isOpen={notFoodListModalIsOpen}>
                    <NotFood notFoodList={notFoodList} setNotFoodList={setNotFoodList} increment={() => setnotFoodListModalIsOpen(false)} />
                </Modal>
                <Modal isOpen={saveRecipeModalIsOpen}>
                    <ModalSaveRecipe increment={() => setSaveRecipeModalIsOpen(false)} />
                </Modal>

                <h1>chat</h1>
                {messages.map((message, index) => (
                    message.role === 'assistant' ? (
                        <div key={index} className={message.role}>
                            {message.content}
                            <button onClick={() => onSave(message.content)}>レシピを保存する</button>
                        </div>
                    ) : (
                        <div key={index} className={message.role}>{message.content}</div>
                    )
                ))}
                <Input onSubmit={handleInputSubmit} />
            </div>
        </>
    );
};

export default Chat;
