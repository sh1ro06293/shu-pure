import React, { useState } from 'react';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onClickLogin = async () => {
        console.log('Email:', email);
        console.log('Password:', password);
        // TODO:ここでログイン処理を行う
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // フォームのデフォルトの送信を防ぐ
        onClickLogin(); // ログイン処理を呼び出す
    };

    return (
        <>
            <h1>新規登録</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">名前:</label>
                    <input type="text" id="name" name="name" required/>
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
