import axios from "axios";
import Cookies from 'js-cookie'
const token = Cookies.get('token')
export default function posts(url, data,) {
    return axios.post(url, data, {
        headers: {
            'Authorization': token
        }
    })
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        });
}