import axios from 'axios';

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