import '../App.css';
import {Link} from 'react-router-dom'
import { SignOut } from '../actions/authActions';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import React, {useEffect, useState} from 'react'

class Nav extends React.Component {

    // const navStyle = {
    //     color: 'white'
    // };
    //console.log(props)
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.props.auth.isAuthenticated ? this.setState({isLoggedIn: true}) : this.setState({isLoggedIn: false})
    }

    logOutUser = () => {
        SignOut();
        this.setState({isLoggedIn: false});
        this.props.history.push("/");
    }
  
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">
                        <Link to="/" className="links">
                            Travel-SL
                        </Link>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                                <a className="nav-link active">
                                    <Link to="/admin" className="links">
                                        Add Place
                                    </Link>
                                </a>
                                <a className="nav-link active">
                                    <Link to="/login" className="links">
                                        Login
                                    </Link>
                                </a>
                                <a className="nav-link active">
                                    <Link to="/register" className="links">
                                        Register
                                    </Link>
                                </a>
                            </div>
                    </div>
                </div>
            </nav>
          );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth || {},
  });
  
  const mapDispatchToProps = {
    SignOut,
  };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
