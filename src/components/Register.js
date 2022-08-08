import '../components/Register.css';
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { withRouter } from "react-router-dom";

class Register extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            conPassword: "",
            role: "",
            styleWidth: ""
        }
    }

    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

        if(e.target.name == "password") {
            //const strongRegex = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");
            let size = 0;
            if(new RegExp("(?=.*[a-z])").test(e.target.value)) {
                size = size + 20;
            }
            if(new RegExp("(?=.*[A-Z])").test(e.target.value)) {
                size= size + 40;
            }
            if(new RegExp("^(?=.*\d)").test(e.target.value)) {
                size = size + 60
            }
            if(new RegExp("(?=.*[a-zA-Z])").test(e.target.value)) {
                size = size + 80
            }
            if(e.target.value.length >= 8) {
                size = size + 100
            }
            this.setState({styleWidth: size});
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        if(this.validate()) {
            if(this.isPasswordMatch()){
                axios.post("http://localhost:5000/api/users/register", {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    role: this.state.role
                }).then(data => {
                    alert("User Added!");
                    this.props.history.push("/login");
                }).catch(err => {
                    alert("Something went wrong || " + err.message)
                })
            }
        }

    }

    isPasswordMatch = () => {
        const {password, conPassword} = this.state;

        if(password === conPassword) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        const {name, email, password, conPassword, role, styleWidth} = this.state;
        
        return (
            <div className="card shadow-sm from-card p-4">
                <h1 className="display-6">Register</h1>
                <form className="mt-2" onSubmit={(e) => this.onFormSubmit(e)}>
                    <div className="mb-3">
                        <label for="nameInput" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={name} 
                        id="nameInput" onChange={(e) => this.formValueChange(e)}></input>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={email} 
                        id="exampleInputEmail1" onChange={(e) => this.formValueChange(e)} 
                        aria-describedby="emailHelp"></input>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e) => this.formValueChange(e)} 
                        id="exampleInputPassword1" value={password} name="password"></input>
                    </div>
                    <div className="progress mb-3">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: styleWidth}}></div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword2" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" onChange={(e) => this.formValueChange(e)} 
                        id="exampleInputPassword2" value={conPassword} name="conPassword"></input>
                    </div>
                    <div className="mb-3">
                        <label for="roleLabel" className="form-label">User Role</label>
                        <select name="role" className="form-select" value={role} onChange={(e) => this.formValueChange(e)}>
                            <option value="">Select user type</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-dark">Submit</button>
                </form>
            </div>
        );
    }

    validate = () => {
        const {name, email, password, conPassword, role} = this.state;

        if(name.length == 0) {
            alert("Name is required!");
            return false;
        }
        else if(email.length == 0) {
            alert("Email is required!");
            return false;
        }
        else if(password.length == 0) {
            alert("Password is required!");
            return false;    
        }
        else if(conPassword.length == 0) {
            alert("Confirm password is required!");
            return false;
        }
        else if(role.length == 0) {
            alert("Role is required!");
            return false;
        }

        return true;
    }
}

export default withRouter(Register);
