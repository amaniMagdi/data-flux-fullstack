import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000'

const instance = axios.create({
 baseURL
  // baseURL: window.location.origin # this will be used with webserver and reverse proxy
});

// Adding baseURL as a custom property to the instance
instance.defaults.baseURL = baseURL;
export default instance;