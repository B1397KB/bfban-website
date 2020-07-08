import axios from 'axios';

const baseURL = 'http://api.bfban.com:9988/api';
// const baseURL = 'http://127.0.0.1:4000/api';
// const baseURL = process.env.NODE_ENV === 'production' ? 'https://bfban.com/api' : 'http://127.0.0.1:4000/api';

const ajax = axios.create({
  baseURL,
  withCredentials: true,
});

export default ajax;
export { baseURL };
