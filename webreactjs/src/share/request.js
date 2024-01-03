import { message } from "antd";
import axios from "axios"
const Config = {
    base_server: "http://localhost:8081/api/"
}

export const request = (url, method, data) => {

    return axios({
        url: Config.base_server + url,
        method: method,
        data:data
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        console.log(err)
        message.error("error-"+err.message)
        return false
        /// error
    }).finally(()=>{
        ///
        console.log("finally")
    })
}