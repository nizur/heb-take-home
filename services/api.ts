import Axios from 'axios';

// NOTE: Paths: /auth for login; /ui/* for the rest

const api = Axios.create({
  //baseURL: 'https://order-pizza-api.herokuapp.com/api',
  baseURL: 'http://localhost:3000/api', // TEMP
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
