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

            </div>
        </>
    );
}

export default Home;
