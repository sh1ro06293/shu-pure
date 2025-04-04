import Header from '../components/header';
import React, { useState, useEffect } from 'react';
import { postChat,saveRecipe  } from '../components/api/api';
import Modal from 'react-modal';
import NotFood from '../components/chat/notFood';
import Input from '../components/chat/input'; // Inputコンポーネントをインポート
import { useUser } from '../components/usercontext';
import ModalSaveRecipe from '../components/chat/modalSaveRecipe';
import ChatMessagesList from '../components/chat/chatMessagesList';
import '../styles/chat.css';


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



    return (
        <>
            <Header />
            <div className="content">
                <div className="openModalButton">
                <button onClick={() => setnotFoodListModalIsOpen(true)}>入れたくないものリスト</button>
                <button onClick={() => setSaveRecipeModalIsOpen(true)}>保存したレシピ</button>
            </div>
                <Modal className="modal-content" overlayClassName="modal-overlay" isOpen={notFoodListModalIsOpen}>
                    <NotFood notFoodList={notFoodList} setNotFoodList={setNotFoodList} increment={() => setnotFoodListModalIsOpen(false)} />
                </Modal>
                <Modal className="modal-content" overlayClassName="modal-overlay" isOpen={saveRecipeModalIsOpen}>
                    <ModalSaveRecipe increment={() => setSaveRecipeModalIsOpen(false)} />
                </Modal>

                <div className='chat'>
                <h1>chat</h1>
                    <ChatMessagesList messages={messages} />
                    <Input onSubmit={handleInputSubmit} />
                </div>
            </div>
        </>
    );
};

export default Chat;
