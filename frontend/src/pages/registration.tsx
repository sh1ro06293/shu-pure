import React, { useState } from 'react';
import { createUser } from '../components/api/api';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    
    const onClickRegistration = async () => {
        const data = { Name:name, Email: email, Password: password };
        console.log('Registration Data:', data);
        await createUser(data);
        
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // フォームのデフォルトの送信を防ぐ
        onClickRegistration(); // ログイン処理を呼び出す
    };

    return (
        <>
            <h1>新規登録</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">名前:</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        required/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password} // valueを追加して制御されたコンポーネントにする
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">新規登録</button>
            </form>
        </>
    );
}

export default Registration;
