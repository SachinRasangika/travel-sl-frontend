// import Axios 
import Axios from "axios";
// import config
import Config from "./Config";
// import cookies 
import Cookies from "js-cookie";

class User {
    constructor() {
        this.api = {
            addUser: "/api/users/register",
            signInUser: "/api/users/login"
        };
    }

    async signUp(data) {
        var sendData = {
            Data: data
        };
        var resp = 201;
        
        await Axios.post(
            `${Config.host}${Config.port}${this.api.addUser}`,
            sendData
        ).then(Response => {
                resp = Response.status;
        }).catch(err => {
            console.error(err);
            try {
                resp = err.response.status;
            } catch (error) {
                resp = 600;
            }
        });

        return resp;
    }

    async signIn(email, password) {
        var resp = 600;
        // var sendData = {
        //     email: email,
        //     passowrd: password,
        // };
        // console.log(sendData);
        
        var userData = {};
        var resp = 600;
        await Axios.post(
            "http://localhost:5000/api/users/login",{
                email: email,
                password: password
            }).then(Response => {
                console.log(Response)
                resp = Response.status;
                userData = Response.data
        }).catch(err => {
            console.error(err);
            try {
                console.error(err);
                resp = err.response.status;
            } catch (error) {
                console.log(error);
                resp = 600;
            }
        });

        if (resp === 200) {
            return userData;
        }
        return resp;
    }

    setCookies(type, token) {
        var secureState = false;
        var sign = true;
        var persist = true
        // var token = "dsdsjgdsjh"
        Cookies.set("type", btoa(type), { expires: 30, secure: secureState });
        Cookies.set("token", token, { expires: 30, secure: secureState });
    }
}

var UserObject = new User();
export default UserObject;