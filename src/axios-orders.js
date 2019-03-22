import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-a2c1c.firebaseio.com/"
});

export default instance;