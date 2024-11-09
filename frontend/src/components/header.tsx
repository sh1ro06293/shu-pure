import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './usercontext';
    
const Header = () => {
    const { user, setUser } = useUser();
    const userId = user.id;
    const name = user.name;
    
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
    const handleLogout = () => {
        setUser({
            id: null,
            name: '',
            email: '',
        });
        navigate('/');
    }
    return (
        <>
            <header>
                <h1 onClick={handleHome}>おつまみ帳</h1>
            <div className="header_btn">
            <button onClick={handleChat}>チャット相談</button>
            <button>レシピの投稿（url適当）</button>
            {(userId)?
            <div>
                <p>{name}</p>
                <button onClick={handleLogout}>ログアウト</button>
            </div>
            :<button onClick={handleLogin}>ログイン</button>}
            </div> 
            </header>
        </>
    );
}

export default Header;
