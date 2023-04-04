import axios from 'axios';

const instance = axios.create({
    baseURL: "https://todo-list-backend-a2bs.onrender.com",
    // baseURL: "http://localhost:8000",
    headers: {'Authorization': '123'}
});
 
export default instance