import React from 'react';
import Input from './input'; // Inputコンポーネントをインポート
import { ListFormat } from 'typescript';

interface NotFoodProps {
    notFoodList: string[];
    setNotFoodList: React.Dispatch<React.SetStateAction<string[]>>
    increment: () => void; // 適切な型定義（関数型）
}

const NotFood: React.FC<NotFoodProps> = ({ increment,notFoodList,setNotFoodList}) => {

    const handleInputSubmit = (text: string) => {
        setNotFoodList(prevNotFoodList => [...prevNotFoodList, text]);
    };

    const onDelete = (index: number) => {
        setNotFoodList((prevNotFoodList) => prevNotFoodList.filter((_, i) => i !== index));
    };

    const onSave = () => {
        increment();
    };
    return (
        <>
            <h2>入れたくないものリスト</h2>
            <button onClick={onSave}>保存</button>

            {notFoodList.map((message, index) => (
                <div key={index} >
                    {message}
                    <button onClick={() => onDelete(index)}>削除</button>
                </div>
            ))}
            <Input onSubmit={handleInputSubmit} />

        </>
    );
}

export default NotFood;
