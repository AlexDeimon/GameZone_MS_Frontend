import axios from "axios";
const api = axios.create({
    baseURL: 'https://e-commerce-backend-2-aeav.onrender.com'
});
export default api;