import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
    
const Header = () => {
    
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
    const handleChat = () => {
        navigate('/chat');
    }
    const handleHome = () => {
        navigate('/');
    }
    return (
        <>
            <header>
                <h1 onClick={handleHome}>おつまみ帳</h1>
            <div className="header_btn">
            <button onClick={handleChat}>チャット相談</button>
            <button>レシピの投稿（url適当）</button>
             <button onClick={handleLogin}>ログイン</button>
            </div> 
            </header>
        </>
    );
}

export default Header;
