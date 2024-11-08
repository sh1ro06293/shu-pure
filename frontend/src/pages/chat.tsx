import Header from '../components/header';
import React, { useState } from 'react';


const Chat = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [text, setText] = useState('');
    const onChangeText = (event:any) => {
    setText(event.target.value);
  };
    const onClickAdd = () => {
        // 空白だったら何もしない
        if (text === '') {
            return;
        }
        setMessages([...messages, text]);
        setText('');
    };
    return (
        <>
            <Header />
            <div className="content">
                <h1>chat</h1>

                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}

                <input value={text} onChange={onChangeText} />
                <button onClick={onClickAdd}>送信</button>
            </div>
        </>
    );
}

export default Chat;
