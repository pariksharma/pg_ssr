import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

axiosClient.interceptors.request.use((req) => {
    const jwt = localStorage.getItem('jwt')
    const user_id = localStorage.getItem('user_id');

    const headers = {
        'Devicetype': 4,
    // 'Version': 1,
        'Version': process.env.REACT_APP_APP_VERSION,
        'Lang': 1,
        'Appid': process.env.REACT_APP_APP_ID,
        'Userid': user_id ? user_id : 0,
        ...(jwt && { 'Jwt': jwt })
    }

    req.headers = headers

    return req
}, (error) => Promise.reject(error))

export default axiosClient