import React, { useEffect, useRef } from 'react';
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

        const notFoodContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        if (notFoodContainerRef.current) {
            notFoodContainerRef.current.scrollTop = notFoodContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [notFoodList]);
    return (
        <>
        <div className='notFoodModal'>
            <h2>入れたくないものリスト</h2>
            <div className='notFoodList'ref={notFoodContainerRef}>
            {notFoodList.map((message, index) => (
                <div key={index} className='notFood'>
                    <p>{message}</p>
                    <button onClick={() => onDelete(index)}>削除</button>
                </div>
            ))}
            </div>
            <div className='saveContent'>
            <Input onSubmit={handleInputSubmit} />
            <button onClick={onSave} className='saveButton'>保存</button>
            </div>

        </div>
        </>
    );
}

export default NotFood;
