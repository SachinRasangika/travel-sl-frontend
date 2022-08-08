import axios from "axios";
import Config from "./Config";

export const getAllVenues = () => {
    return new Promise( (resolve,reject) => {
        return axios.get(`http://localhost:5000/api/items/getall`)
            .then( result => {
               if(result.status == 200){
                    resolve(result.data)
               }else{
                resolve([])
               }
            })
            .catch( err => {
                reject(err)
            })
    })
}

export const insertVenue = (files , data) => {
    let formdata = new FormData();
    formdata.set("name" , data.name );
    formdata.set("address" , data.address );
    formdata.set("location" , data.location );
    formdata.set("contactNumber" , data.contactNumber );
    formdata.set("type" , data.type );

    console.log(files);
    for (let i = 0; i < files.length; i++) {
        formdata.append("photos" , files[i]);    
    }
    

    return new Promise( (resolve,reject) => {
        return axios.post(`http://localhost:5000/api/items/create` , formdata)
            .then( result => {
                    resolve({code : 200 , message : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const getVenueById = id => {
    console.log(id);

    return new Promise( (resolve,reject) => {
        return axios.get(`http://localhost:5000/api/items/getone/${id}`)
            .then( result => {
               if(result.status == 200){
                    resolve(result.data)
               }else{
                reject({error : 'not found'})
               }
            })
            .catch( err => {
                reject(err)
            })
    })
}

export const deleteVenue = (id) => {

    return new Promise( (resolve,reject) => {
        return axios.delete(`http://localhost:5000/api/items/delete/${id}`)
            .then( result => {
                    resolve({code : 200 , message : result.data })
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}

export const updateVenue = (data) => {
    
    console.log(data);
    
    return new Promise( (resolve,reject) => {
        return axios.patch(`http://localhost:5000/api/items/update/${data.id}` , data)
            .then( result => {
                    console.log(result.data)
                    resolve({code : 200 , message : result.data})
            })
            .catch( err => {
                reject({ code : 0 , error : err})
            })
    })
}