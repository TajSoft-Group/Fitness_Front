import axios from "axios";
import Cookies from 'js-cookie';

const token = Cookies.get('token');
console.log(token);

export default function form_Data(url, data) {
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        }
    })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса:', error);
            throw error; // Пробрасываем ошибку дальше для обработки в вызывающем коде
        });
}