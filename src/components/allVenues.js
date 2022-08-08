import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import {getAllVenues} from '../Controllers/Items';
import {deleteVenue} from '../Controllers/Items';
import config from "../Controllers/Config";
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom';
// import Modal from 'react-modal';
import { Modal, Button } from 'react-bootstrap';

class AllVenues extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            venuesList: [],
            filterValues: [],
            loading: true,
            show: false,
            item: {}
        }
    }

    componentDidMount() {
        this.loadVenues();
    }

    loadVenues = () => {
        getAllVenues().then((result) => {
            console.log(result);
            this.setState({ venuesList: result });
          })
          .catch((err) => {
            console.log(err);
          });
    }

    render() {
        const {venuesList} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <h1 className="" >All Venues</h1>
                    {venuesList.map((item) => this.renderVenuesList(item))}
                </div>
                
            </div>
        );
    } 

    onViewClick = (e, item) => {
        e.preventDefault();
        this.setState({show: true});
        this.setState({item: item});

        console.log(this.state.show)
    }

    onCloseClick = (e) => {
        e.preventDefault();
        this.setState({show: false});
    }

    deleteVenue = (item) => {
        deleteVenue(item._id).then(data => {
            alert("Successfully deleted");
            let allVenues = this.state.venuesList;
            let filteredVenues = allVenues.filter(i => {
                return i._id != item._id
            })
            this.setState({venuesList: filteredVenues})
        }).catch(err => {
            console.log("Something went wrong " + err)
        })
    }

    renderVenuesList = (item) => {
        console.log("Rendered item: ", item);
        const StateItem = this.state.item;
        console.log("State Item", StateItem.image)
        return(
            <div className="card mb-3" key={item._id}>
            <img src={config.setImage(item.image[0])} class="card-img-top mt-2" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <h5 className="card-title text-info">Location: {item.location}</h5>
                    <p className="card-text">Address: {item.address}</p>
                    <p className="card-text"><small class="text-muted">Contact Number: {item.contactNumber}</small></p>
                    <button type="button" className="btn btn-dark mx-2" onClick={(e) => this.onViewClick(e, item)}>View</button>
                    <button type="button" className="btn btn-danger mx-2" onClick={() => this.deleteVenue(item)}>Delete</button>
                    <button type="button" className="btn btn-dark mx-2"><Link to={"/edit?venueid="+item._id} style={{color: "white", textDecoration: "none"}}>Edit</Link></button>
                </div>
                <Modal show={this.state.show}>
                    <Modal.Header>
                    <Modal.Title>{this.state.item.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <image src={config.setImage(StateItem && StateItem.image && StateItem.image[0])} className="card-img-top mt-2" alt="..."></image> */}
                        <p>Location: {StateItem.location}</p>
                        <p>Address: {StateItem.address}</p>
                        <p>Contact Number: {StateItem.contactNumber}</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => this.onCloseClick(e)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => this.onCloseClick(e)}>
                        Alright
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            // <h3>Item</h3>
        );
    }

    showModel = (item) => {
        const show = this.state.show;
        return (
            <Modal show={show}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary">
                    Close
                </Button>
                <Button variant="primary">
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    
}

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default (withRouter)(AllVenues);