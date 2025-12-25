import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export default function deletes(url, t) {
    return axios
        .delete(url, {
            headers: {
                Authorization: t || token,
            },
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                Cookies.remove("token");
                router.push("/login");
            }
            throw error;
        });
}
