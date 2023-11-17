import axios from 'axios';
import Config from 'react-native-config';

const BaseService = axios.create({
    timeout: 60000,
    baseURL: Config.API_URL,
});

export default BaseService;
