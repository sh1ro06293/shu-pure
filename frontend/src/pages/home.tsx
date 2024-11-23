import React, { useState } from 'react';
import Header from '../components/header';
import { useUser } from '../components/usercontext';
import SaveChatRecipeList from '../components/saveChatRecipe/saveChatRecipeList';

const Home = () => {
    const { user, setUser } = useUser();
    console.log(user);
    return (
        <>
            <Header />
            <div className="main">
                <h1>Home</h1>
                <p>おつまみ帳へようこそ！</p>
                <SaveChatRecipeList />

                
            </div>
        </>
    );
}

export default Home;
