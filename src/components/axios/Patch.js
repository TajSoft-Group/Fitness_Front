import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
export default function Patch(url, data) {
  return axios
    .patch(url, data, {
      headers: {
        Authorization: token,
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
      return error;
    });
}
