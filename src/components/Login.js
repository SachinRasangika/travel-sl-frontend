import '../App.css';
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { setCurrentUser } from "../actions/authActions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Config from "../Controllers/Config";
import User_Controller from "../Controllers/User";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onFormSubmit = async (e) => {
        e.preventDefault();

        if(this.validate()) {
            let loggedIn = await User_Controller.signIn(this.state.email, this.state.password);
            console.log(loggedIn)

            switch(loggedIn) {
                case 403:
                    await Config.showAlert(
                        "Passwod did not match"
                    );
                await  this.props.history.push('/login')
                    return 0;
                case 401:
                    await Config.showAlert(
                        "Passwod did not match"
                    );
                await  this.props.history.push('/login')
                break;
                // network error
                case 600:
                    Config.showAlert("Please check your network connection", "Oops!");
                await  this.props.history.push('/')
                    break;
                case 500:
                    Config.showAlert("Somthing went wrong. Please try again", "Oops!");
                await  this.props.history.push('/')
                    break;
                default:
                    //await Config.showAlert("Success", "Done!");
                    alert("Success");
                    if(loggedIn.type == "admin") {
                        await this.props.history.push("/admin");
                    }
                    else {
                        await this.props.history.push("/")
                    }
                    
                    break;
            }

            console.log(loggedIn)

            User_Controller.setCookies(loggedIn.type, loggedIn.token);
            // axios.post("http://localhost:5000/api/users/login", {
            //     email: this.state.email,
            //     password: this.state.password
            // }).then(data => {
            //     console.log(data)
            //     this.props.setCurrentUser(data.data)
            //     if(data.data.type == "admin") {
            //         this.props.history.push("/admin");
            //     }
            //     if(data.data.type == "user") {
            //         this.props.history.push("/");
            //     }
            //     alert("Logged in");
            // }).catch(err => {
            //     alert("Login failed || " + err.message);
            // })
        }
        else {
            alert("Failed")
        }
    } 

    render() {
        const {email, password} = this.state;
        return (
            <div className="card shadow-sm p-5 card-size bold">
                <form onSubmit={(e) => this.onFormSubmit(e)} className="login">
                <h1 className="display-6">Login</h1>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" name="email" value={email} 
                  id="exampleInputEmail1" onChange={(e) => this.formValueChange(e)} 
                  aria-describedby="emailHelp"></input>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" onChange={(e) => this.formValueChange(e)} 
                   id="exampleInputPassword1" value={password} name="password"></input>
                </div>
                <button type="submit" class="btn btn-dark">Submit</button>
            </form>
            </div>
      
        );
    }

    validate = () => {
        let {email, password} = this.state;

        if(email.length == 0) {
            alert("Email is required!");
            return false;
        }
        else if(password.length == 0) {
            alert("Password is required!");
        }
        else {
            return true;
        }
    }
  
}

export default connect(null, { setCurrentUser })(withRouter(Login));
