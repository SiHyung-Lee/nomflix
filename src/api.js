import axios from 'axios';

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "df2d4dee44d982356f572c174844005c",
        language: "en-US"
    }
});

api.get("tv/popular");

export default api;