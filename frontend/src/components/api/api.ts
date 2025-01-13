import axios from 'axios';
import { useUser } from '../../components/usercontext';




// Axiosのインスタンスを作成し、baseURLを設定
export const fastapiUrl = axios.create({
  baseURL: process.env.REACT_APP_FASTAPI_URL,
});

export async function createUser(data: any) {
    try {
        const response = await fastapiUrl.post('/register', data);
        console.log('Response:', response);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data.detail);
        } else {
            console.error('Unexpected error:', error);
        }
    }
}

export async function login(data: any) {
    try {
        const response = await fastapiUrl.post('/login', data);
        console.log('Response:', response);

        
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data.detail);
        } else {
            console.error('Unexpected error:', error);
        }
    }
}

export async function postChat(data: any) {
    try {
        // データを適切な形式に変換
        const requestData = data

        console.log('Request Data:', requestData);

        // POSTリクエストを送信
        const response = await fastapiUrl.post('/chat', data, {
            headers: {
                'Content-Type': 'application/json' // ヘッダーにContent-Typeを追加
            }
        });

        console.log('Response:', response.data);
        return response.data; // レスポンスデータを返す
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Axiosエラーの場合、詳細をアラート表示
            console.error(error.response?.data.detail || 'An error occurred');
        } else {
            // その他のエラーの場合
            console.error('Unexpected error:', error);
        }
    }
}

export async function saveRecipe(data:any){
    try {
        console.log(data);
        const response = await fastapiUrl.post('/save_recipe', data, {
            headers: {
                'Content-Type': 'application/json' // ヘッダーにContent-Typeを追加
            }});
        console.log('Response:', response);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data.detail);
        } else {
            console.error('Unexpected error:', error);
        }
    }
}


export async function getSaveChatRecipeTitels(user_id: number) {
    try {
        const response = await fastapiUrl.get(`/save_recipe/${user_id}`, {  headers: {  'Content-Type': 'application/json' }});
        console.log(response.data.recipes);
        return response.data.recipes;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data.detail);
        } else {
            console.error('Unexpected error:', error);
        }
    }
}

export async function getSaveChatRecipe(data:any){
    try {
        const response = await fastapiUrl.get(`/save_recipe/${data.user_id}/${data.recipeid}`, {  headers: {  'Content-Type': 'application/json' }});
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data.detail);
        } else {
            console.error('Unexpected error:', error);
        }
    }
}

export async function postLike(data:any){
     try {
        // データを適切な形式に変換
        const requestData = data

        console.log('Request Data:', requestData);

        // POSTリクエストを送信
        const response = await fastapiUrl.post('/like', data, {
            headers: {
                'Content-Type': 'application/json' // ヘッダーにContent-Typeを追加
            }
        });

        console.log('Response:', response.data);
        return response.data; // レスポンスデータを返す
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Axiosエラーの場合、詳細をアラート表示
            console.error(error.response?.data.detail || 'An error occurred');
        } else {
            // その他のエラーの場合
            console.error('Unexpected error:', error);
        }
    }
}