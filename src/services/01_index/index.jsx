import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Đường dẫn JSON Server của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;