import React, { useState } from 'react';

type InputProps = {
    onSubmit: (text: string) => void; // textを引数として受け取り、親に渡す関数
};

const Input: React.FC<InputProps> = ({ onSubmit }) => {
    const [text, setText] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const onClick = () => {
        if (text.trim() === '') {
            return;
        }
        onSubmit(text); // 親コンポーネントに現在のtextを渡す
        setText(''); // 入力フィールドをクリア
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClick(); // エンターキーが押されたときに送信処理を呼び出す
        }
    };

    return (
        <div className="input">
            <input 
                value={text} 
                onChange={onChange} 
                onKeyDown={onKeyDown} // エンターキーのイベントを追加
            />
            <button onClick={onClick}>送信</button>
        </div>
    );
};

export default Input;
