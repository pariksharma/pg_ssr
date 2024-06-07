import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://developmentapi.videocrypt.in/data_model/"
})

axiosClient.interceptors.request.use((req) => {
    const jwt = localStorage.getItem('jwt')
    const user_id = localStorage.getItem('user_id');

    const headers = {
        'Devicetype': 4,
    // 'Version': 1,
        'Version': 1998,
        'Lang': 1,
        'Appid': 427,
        'Userid': user_id ? user_id : 0,
        ...(jwt && { 'Jwt': jwt })
    }

    req.headers = headers

    return req
}, (error) => Promise.reject(error))

export default axiosClient