import axios from "axios";

const melomix_api = axios.
create ({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api'
})

export default melomix_api;
