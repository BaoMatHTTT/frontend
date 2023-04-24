import axios from './axios';
import { message } from 'antd';

const AuthenticationAPI = {
    Login: async (username, password) => {
        try {
            const result = await axios({
                url: '/login',
                method: 'post',
                withCredentials: true,
                auth: {
                    username: username,
                    password: password
                }
            })
            return result.data
        } catch (err) {
            console.error(err);
            message.error(err.response.data.error)
            throw err;
        }
    },

    Logout: async () => {
        try {
            const result = await axios.post('/logout')
            return result.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },

    GetCurrentUser: async () => {
        try {
            const result = await axios.get('/session')
            return result.data;
        } catch (err) {
            console.error(err);
        }
    }
}

export default AuthenticationAPI;