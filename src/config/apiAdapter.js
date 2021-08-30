import axios from 'axios';
const { REACT_APP_API_SERVER } = process.env;

const instance = axios.create({
  baseURL: REACT_APP_API_SERVER,
  timeout: 5000,
  // headers: { 'X-Custom-Header': 'foobar' },
});

export default instance;
