import Header from '../components/header';
import React, { useState, useEffect } from 'react';
import { postChat } from '../components/api/api';

const Chat = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [text, setText] = useState('');
    const [shouldFetch, setShouldFetch] = useState(false); // フェッチのトリガー用の状態

    const onChangeText = (event: any) => {
        setText(event.target.value);
    };

    const onClickAdd = () => {
        // 空白だったら何もしない
        if (text === '') {
            return;
        }

        const newMessage = { role: 'user', content: text };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setText('');
        setShouldFetch(true); // フェッチをトリガー
    };

    useEffect(() => {
        const fetchData = async () => {
            if (shouldFetch) {
                const response = await postChat(messages);
                setMessages(prevMessages => [...prevMessages, response]);
                setShouldFetch(false); // フェッチ後にリセット
            }
        };
        fetchData();
    }, [shouldFetch, messages]); // shouldFetchとmessagesを依存配列に追加

    return (
        <>
            <Header />
            <div className="content">
                <h1>chat</h1>
                {messages.map((message, index) => (
                    <div key={index}>{message.content}</div>
                ))}
                <input value={text} onChange={onChangeText} />
                <button onClick={onClickAdd}>送信</button>
            </div>
        </>
    );
}

export default Chat;
