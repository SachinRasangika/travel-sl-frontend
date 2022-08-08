import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import image from './webimage.jpg'
import HotelImage from './hotel.jpg'
import BeachImage from './beachImage.jpg'
import CulturalImage from './culturalImage.jpg'
import { withRouter } from 'react-router-dom';
import gif from './beachVideo.gif'
import {Link} from 'react-router-dom'
import './Home.css';
import { insertFeedback } from "../Controllers/Feedback";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            subject: '',
            message: '',
            errors: {}
        }
    }

    onImageClick = (e) => {
        e.preventDefault();
        this.props.history.push("/allvenues");
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        if(this.validate()) {
            insertFeedback({
                email: this.state.email,
                subject: this.state.subject,
                message: this.state.message
            }).then(data => {
                alert("Feedback sent!");
                this.clearAll();
            }).catch(err => {
                alert("Something went wrong!");
            })
        }
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value });
     }

     validate = () => {
        const {email, subject, message, errors} = this.state;     
        let count = 0;

        if( email.length == 0 ){
            errors.email = "email can not be empty"
            count++
        }else{
            errors.email = "" 
        }

        if( subject.length == 0 ){
            errors.subject = "subject can not be empty"
            count++
        }else{
            errors.subject = "" 
        }

        if( message.length == 0 ){
            errors.message = "message can not be empty"
            count++
        }else{
            errors.message = "" 
        }

        this.setState({errors});
        return count == 0;
     }

     clearAll = () => {
         this.setState({
            email: '',
            subject: '',
            message: '',
            errors: {}
         })
     }

    render() {
        return (
            // <img src={image} className="image" style={{height: "30vh", width: "100%"}} alt="..."/>
            // <div className="divImage text-white mt-0 pt-5">
            //     <h1>Welcome to Website!</h1>
            // </div>
            <div className="container-flex">
                <header>
                    <div className="overlay"></div>
                    <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                        <source src="https://www.anantaya.lk/chilaw/wp-content/uploads/sites/3/2016/06/Anantaya-chilaw_optimized_1.mp4" type="video/mp4" />
                    </video>
                    
                    <div className="container h-100">
                        <div className="d-flex h-100 text-center align-items-center">
                            <div className="w-100 text-white">
                                <h1 className="display-3">Welcome to  Travel-SL</h1>
                                <p className="lead mb-0"> <b>The wonder of asia</b></p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container text-center">

                    <h2 className="mb-4 mt-1">Pick one from here</h2>

                    <div className="row">
                            <div className="col-md-4 mt-3 mb-3 imageDiv" onClick={(e) => this.onImageClick(e)}>
                                <div className="card booking-card">
                                    <div className="view overlay">
                                        <img className="card-img-top" src={HotelImage} style={{ height: '300px' }} alt="Card image cap" />
                                        <a href="#!">
                                            <div className="mask rgba-white-slight"></div>
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title font-weight-bold"><a>Hotels</a></h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mt-3 mb-3 imageDiv" onClick={(e) => this.onImageClick(e)}>
                                <div className="card booking-card">
                                    <div className="view overlay">
                                        <img className="card-img-top" src={CulturalImage} style={{ height: '300px' }} alt="Card image cap" />
                                        <a href="#!">
                                            <div className="mask rgba-white-slight"></div>
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title font-weight-bold"><a>Cultural Sites</a></h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mt-3 mb-3 imageDiv" onClick={(e) => this.onImageClick(e)}>
                                <div className="card booking-card">
                                    <div className="view overlay">
                                        <img className="card-img-top" src={BeachImage} style={{ height: '300px' }} alt="Card image cap" />
                                        <a href="#!">
                                            <div className="mask rgba-white-slight"></div>
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title font-weight-bold"><a>Beaches</a></h4>
                                    </div>
                                </div>
                            </div>
                        
                    </div>

                    <div className="container">
                        <div className="row px-5 py-5">
                            <form className="py-2" method="POST" onSubmit={(e) => this.onFormSubmit(e)}>
                                <div className="col-sm">

                                </div>
                                <div className="col-sm">
                                    <div className="row">
                                        <h3 className="form-label py-2 px-5">Feedback</h3>
                                        <input
                                            type="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={(e) => this.formValueChange(e)}
                                            placeholder="Email"
                                            className="form-control mt-2 mb-2"
                                        />
                                    </div>
                                    <div className="row">
                                        <input
                                                type="text"
                                                name="subject"
                                                value={this.state.subject}
                                                onChange={(e) => this.formValueChange(e)}
                                                placeholder="Subject"
                                                className="form-control mt-2 mb-2"
                                            />
                                    </div>
                                    <div className="row">
                                        <input
                                                type="text"
                                                name="message"
                                                value={this.state.message}
                                                onChange={(e) => this.formValueChange(e)}
                                                placeholder="Message"
                                                className="form-control mt-2 mb-2"
                                            />
                                    </div>
                                    <div className="row">
                                        <div className="d-flex">
                                            <button
                                            className="px-4 btn btn-dark mt-2 btn-sm bold-normal"
                                            type="submit"
                                            >
                                            Send Feedback
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm">

                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <footer className="page-footer font-small cyan darken-3 " style={{ backgroundColor: '#343A40' }}>

                    <div className="container">

                        <div className="row">

                            <div className="col-md-12 py-2">


                                <div className="mb-2 pt-2 flex-center text-center">

                                    <a className="fb-ic">
                                        <i style={{ color: 'white' }} className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </a>
                                    <a className="tw-ic">
                                        <i style={{ color: 'white' }} className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </a>
                                    <a className="gplus-ic">
                                        <i style={{ color: 'white' }} className="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </a>
                                    <a className="li-ic">
                                        <i style={{ color: 'white' }} className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </a>
                                    <a className="ins-ic">
                                        <i style={{ color: 'white' }} className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </a>
                                    <a className="pin-ic">
                                        <i style={{ color: 'white' }} className="fab fa-pinterest fa-lg white-text fa-2x"> </i>
                                    </a>
                                </div>



                            </div>

                        </div>

                    </div>


                </footer>
            </div>
        )
    }
}

export default (withRouter)(Home);