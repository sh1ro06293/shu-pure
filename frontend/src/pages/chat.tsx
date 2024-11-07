import Header from '../components/header';
import React, { useState } from 'react';


const Chat = () => {

    return (
        <>
            <Header />
            <div className="content">
                <h1>chat</h1>
                <input type="text" id="message-input" placeholder="Enter your message" />
                <button id="send-button">Send</button>
            </div>
        </>
    );
}

export default Chat;
