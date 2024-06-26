import axios from "axios";
import Cookies from 'js-cookie'
const token = Cookies.get('token')
export default function posts(url, data,) {
    axios.post(url, data, {
    })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log('err' + error);
        });
}