import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-react-burger-app-c1963.firebaseio.com/'
});

export default instance;