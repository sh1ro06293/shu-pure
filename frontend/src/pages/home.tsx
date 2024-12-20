import React, { useState } from 'react';
import Header from '../components/header';
import { useUser } from '../components/usercontext';
import SaveChatRecipeList from '../components/saveChatRecipe/saveChatRecipeList';
import '../styles/home.css';

const Home = () => {
    const { user, setUser } = useUser();
    return (
        <>
            <Header />
            <div className="main">
                <div className='home'>
                    <h1>Home</h1>
                    <p>おつまみ帳へようこそ！</p>
                </div>
                <SaveChatRecipeList />
                {(user.id) ? (
                <h2>旬の野菜のおつまみ</h2>
                ):(
                <h2>ログインすると旬の野菜のおつまみを見ることができます</h2>
                )}



                
            </div>
        </>
    );
}

export default Home;
