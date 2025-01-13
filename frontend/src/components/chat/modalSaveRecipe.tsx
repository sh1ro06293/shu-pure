import React from 'react';
import SaveChatRecipeList from '../saveChatRecipe/saveChatRecipeList';


interface ModalSaveRecipeProps {
    increment: () => void; // 適切な型定義（関数型）
}

const ModalSaveRecipe: React.FC<ModalSaveRecipeProps> = ({ increment}) => {


    const onSave = () => {
        increment();
    };
    return (
        <div className='saveChatRecipeModal'>
            <button className='closeBtn' onClick={onSave}>閉じる</button>
            <SaveChatRecipeList filter= {false} />
        </div>
    );
}

export default ModalSaveRecipe;
