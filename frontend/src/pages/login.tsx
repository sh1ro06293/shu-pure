import { log } from 'console';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../components/api/api';
import { useUser } from '../components/usercontext';
import '../styles/login.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    const onClickLogin = async () => {
        const data = { Email: email, Password: password };
        const response = await login(data);
        if (response) {
            setUser({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            });
            navigate('/');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // フォームのデフォルトの送信を防ぐ
        onClickLogin(); // ログイン処理を呼び出す
    };
    const handleRegistration = () => {
        navigate('/registration');
    };

    return (
        <div className='loginContainer'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password :</label>
                    <input
                        type="password"
                        id="password"
                        value={password} // valueを追加して制御されたコンポーネントにする
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <button onClick={handleRegistration}>新規登録</button>
            </form>

        </div>
    );
}

export default Login;
