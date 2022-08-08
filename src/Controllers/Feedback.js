import axios from "axios";
import Config from "./Config";

export const insertFeedback = (data) => {

    return new Promise( (resolve,reject) => {
        return axios.post(`http://localhost:5000/api/feedback/create` , data)
            .then( result => {
                    resolve({code : 200 , message : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}