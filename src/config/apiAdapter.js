import axios from 'axios';
const { REACT_APP_API_SERVER } = process.env;

const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export default instance;
