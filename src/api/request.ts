import axios from "axios";

const request = axios.create({
    baseURL: "/api",
    timeout: 30000,
})

request.interceptors.response.use(
    (res) => {
        if (res.data.code === 0) {
            return res.data
        }
    },
    (err) => {
        return err
    }
)


export default request