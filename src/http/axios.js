import axios from 'axios'
import config from '@/config/base'
var instance =axios.create({
    baseURL: config.courseHost
})
export default instance