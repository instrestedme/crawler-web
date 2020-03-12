import axios from './axios'
function getData({url,params}) {
    return axios({
        method:"get",
        url,
        params,
    })
}
export default getData