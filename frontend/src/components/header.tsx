import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './usercontext';
import '../styles/header.css';
    
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
    const handleChatRecipeHistory = () => {
        navigate('/chatRecipeHistory');
    }
    const handleLogout = () => {
        setUser({
            id: null,
            name: '',
            email: '',
        });
        navigate('/');
        window.location.reload();
    }
    return (
        <>
            <header>
            <div className="header_items">
            <h1 onClick={handleHome}>おつまみ帳</h1>
            <div className="header_btn">
            <table>
    <tbody>
        <tr>
            <td><button onClick={handleChat}>チャット相談</button></td>
            <td><button onClick={handleChatRecipeHistory}>保存したレシピ</button></td>
            {userId ? (
                <tr className='userdata'>
                    <td><p>{name}</p></td>
                    <td><button onClick={handleLogout}>ログアウト</button></td>
                </tr>
            ) : (
                <td><button onClick={handleLogin}>ログイン</button></td>
            )}
        </tr>
    </tbody>
</table>

            </div> 
            </div>
            </header>
        </>
    );
}

export default Header;


