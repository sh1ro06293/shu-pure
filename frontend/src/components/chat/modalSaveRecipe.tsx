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
        <>
            <button onClick={onSave}>閉じる</button>
            <SaveChatRecipeList />
        </>
    );
}

export default ModalSaveRecipe;
