import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export default function gets(url, t) {
  return axios
    .get(url, {
      headers: {
        Authorization: t || token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}
