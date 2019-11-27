import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-77d34.firebaseio.com/'
})

export default instance;