import axios from "axios";
import Swal from "sweetalert2";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9000/api"
    : window.location.origin;
let alertTimeout = null;

const Axios = axios.create({ baseURL, timeout: 1000 * 30 });

Axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 404) {
        return Promise.reject(err);
      }
    } else if (err.message === "Network Error") {
      clearTimeout(alertTimeout);
      alertTimeout = setTimeout(function () {
        if (Swal.isVisible()) {
          Swal.showLoading();
          Swal.update({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "เกิดข้อผิดพลาดระหว่างการเรียกข้อมูล",
          });
          Swal.hideLoading();
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "เกิดข้อผิดพลาดระหว่างการเรียกข้อมูล",
          });
        }
      }, 500);
    }

    return Promise.reject(err);
  }
);

export default Axios;
