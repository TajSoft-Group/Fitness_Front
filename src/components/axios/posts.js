import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
import router from "../../router";
export default function posts(url, data, t) {
  return axios
    .post(url, data, {
      headers: {
        Authorization: t || token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      //   console.log("error!!!", error);
      //   if (error.response && error.response.status === 401) {
      //     Cookies.remove("token");
      //     router.push("/login");
      //   }
      return error;
    });
}
