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
        const requestData = JSON.stringify({ "messages": data });

        console.log('Request Data:', requestData);

        // POSTリクエストを送信
        const response = await fastapiUrl.post('/chat', requestData, {
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