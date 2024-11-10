import Header from '../components/header';
import React, { useState, useEffect } from 'react';
import { postChat } from '../components/api/api';
import Modal from 'react-modal';
import NotFood from '../components/chat/notFood';
import Input from '../components/chat/input'; // Inputコンポーネントをインポート

Modal.setAppElement('#root');

const Chat = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [notFoodList, setNotFoodList] = React.useState<string[]>([]);


    const handleInputSubmit = (text: string) => {
        const newMessage = { role: 'user', content: text };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setShouldFetch(true); // 新しいメッセージが追加されたらデータフェッチをトリガー
    };

    useEffect(() => {
        const fetchData = async () => {
            if (shouldFetch) {
                const response = await postChat(messages);
                setMessages(prevMessages => [...prevMessages, response]);
                setShouldFetch(false);
            }
        };
        fetchData();
    }, [shouldFetch, messages]);


    const onSave = (message: string) => {
        console.log(message);
    };


    return (
        <>
            <Header />
            <div className="content">
                <button onClick={() => setModalIsOpen(true)}>入れたくないものリスト</button>
                <button>保存したレシピ</button>
                <Modal isOpen={modalIsOpen}>
                    <NotFood notFoodList={notFoodList} setNotFoodList={setNotFoodList} increment={() => setModalIsOpen(false)} />
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
