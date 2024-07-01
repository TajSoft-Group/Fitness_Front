import axios from "axios";
import Cookies from 'js-cookie';

const token = Cookies.get('token');

export default function gets(url) {
    return axios.get(url, {
        headers: {
            'Authorization': token
        }
    }).then(response => {
        return response;
    }).catch(error => {
        throw error;
    });
}
