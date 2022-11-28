// import axios from "axios";
//
// const network = axios.create({
//
//     baseURL: "https://powercrm.tk/api/",
//     headers: {
//         "Content-Type": "application/json",
//         "Api-Key": localStorage.getItem('access_token'),
//     },
// });
//
//
// export default network;
import axios from 'axios';
// Проверим в самом начале, есть ли токен в хранилище
let JWTToken = ''

if (typeof window !== 'undefined') {

    JWTToken = localStorage.getItem('access_token')
}
// Создать инстанс axios
const api = axios.create({
    baseURL: `https://dayana-top.com.ua/api/`
});

function apiSetHeader (value) {
    if (value) {
        api.defaults.headers['Api-Key'] = value;
    }
};

// Если токен есть, то добавим заголовок к запросам
if (JWTToken) {
    apiSetHeader(JWTToken);
}

api.interceptors.request.use(config => {
    // Если пользователь делает запрос и у него нет заголовка с токеном, то...
    // if (!config.defaults.headers['Api-Key']) {
    //     // Тут пишем редирект если не авторизован
    // }
   console.log(config)
    return config;
}, error => {
    return Promise.reject(error);
});

export default {api, apiSetHeader};
