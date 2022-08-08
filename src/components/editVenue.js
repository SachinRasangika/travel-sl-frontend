import React, { Component } from 'react';
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Config from '../Controllers/Config';
import { withRouter } from 'react-router-dom';
import { getVenueById } from '../Controllers/Items';
import { updateVenue } from '../Controllers/Items';

class EditVenue extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: '',
            address: '',
            location: '',
            contactNumber: '',
            type: '',
            files: [],
            errors: {},
            id: ""
        }
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value });
     }

     componentDidMount() {
        console.log(this.props.location.search.split('='));
        let str = this.props.location.search.split('=');
        let id = str[1];
        this.setState({id: id});
        getVenueById(id)
        .then(
            (res) => {
                console.log(res);
                this.setState({
                    name: res.name,
                    address: res.address,
                    location: res.location,
                    contactNumber: res.contactNumber,
                    type: res.type,
                })
            }
        )
     }

     onFormSubmit = (e) => {
        e.preventDefault();
        console.log("Submit")
        if(this.validate()){
            updateVenue({
                name: this.state.name,
                address: this.state.address,
                location: this.state.location,
                contactNumber: this.state.contactNumber,
                type: this.state.type,
                id: this.state.id
            }).then(data => {
                alert("Done");
                this.props.history.push("/allvenues");
            }).catch(err => {
                alert("Something went wrong");
            })
        }
        //     console.log("Submit called");
        //     updateVenue({
        //             name: this.state.name,
        //             address: this.state.address,
        //             location: this.state.location,
        //             contactNumber: this.state.contactNumber,
        //             type: this.state.type,
        //             id: this.state.id
        //     }).then(result => {
        //         this.clearAll();
        //         //Config.setToast("Venue Added Successfully");
        //         alert("Venue Updated Successfully");
        //         this.props.history.push("/allvenues")
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         //Config.setErrorToast("Somthing Went Wrong!");
        //         alert("Somthing Went Wrong!");
        //     })
        // }
    }

    render(){
        const {name, address, location, contactNumber, type, errors} = this.state;

        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                    <h2>Edit Venue</h2>
                    <form
                  className=" py-2  px-3"
                  method="POST"
                  onSubmit={(e) => this.onFormSubmit(e)}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="form-label py-2">Venue Name</h6>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="Venue Name"
                        className="form-control"
                      />
                      {errors.name &&
                        errors.name.length > 0 && (
                          <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                            {errors.name}
                          </h4>
                        )}
                    </div>

                    <div className="col-md-6">
                      <h6 className="form-label py-2">Venue Address</h6>
                      <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="Venue address"
                        className="form-control"
                      />
                      {errors.address &&
                        errors.address.length > 0 && (
                          <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                            {errors.address}
                          </h4>
                        )}
                    </div>

                    <div className="col-md-12">
                      <h6 className="form-label py-2">Location</h6>
                      <textarea
                        type="text"
                        name="location"
                        value={location}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="location of the place"
                        className="form-control"
                      />
                      {errors.location &&
                        errors.location.length > 0 && (
                          <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                            {errors.location}
                          </h4>
                        )}
                    </div>

                    <div className="col-md-12 mt-3">
                      <input
                        type="text"
                        name="contactNumber"
                        value={contactNumber}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="Contact Number"
                        className="form-control"
                      />
                      {errors.contactNumber &&
                        errors.contactNumber.length > 0 && (
                          <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                            {errors.contactNumber}
                          </h4>
                        )}
                    </div>
                    
                    <div className="col-md-12 mt-3">
                      <input
                        type="text"
                        name="type"
                        value={type}
                        onChange={(e) => this.formValueChange(e)}
                        placeholder="type"
                        className="form-control"
                      />
                      <h4 className="small text-muted mt-2 font-weight-bold mb-0">
                            please add hotel, beach or cultural site as type
                          </h4>
                      {/* <select className="form-select" name="type" onChange={(e) => this.formValueChange(e)}>
                          <option value="">Select a type</option>
                          <option value="hotel">Hotel</option>
                          <option value="beach">Beach</option>
                          <option value="cultural">Cultural Site</option>
                      </select> */}
                      {errors.type &&
                        errors.type.length > 0 && (
                          <h4 className="small text-danger mt-2 font-weight-bold mb-0">
                            {errors.type}
                          </h4>
                        )}
                    </div>

                    <div className="col-md-12 mt-2">
                      <div className="d-flex">
                        <button
                          className="px-4 btn btn-dark mt-2 btn-sm bold-normal"
                          type="submit"
                        >
                          Update Venue
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                    </div>
                </div>
            </div>
        )
    }

    validate = () => {
        
        const {name, address, location, contactNumber, type, errors} = this.state;     
        let count = 0;
        
        if( name.length == 0 ){
            errors.name = "Name can not be empty"
            count++
        }else{
            errors.name = "" 
        }
    
        if( address.length == 0 ){
            errors.address = "address can not be empty"
            count++
        }else{
            errors.address = "" 
        }
    
        if( location.length == 0 ){
            errors.location = "location can not be empty"
            count++
        }else{
            errors.location = "" 
        }
    
        if( contactNumber.length == 0 ){
            errors.contactNumber = "Contact Number can not be empty"
            count++
        }else{
            errors.contactNumber = "" 
        }
        
        if( type.length == 0 ){
            errors.type = "type can not be empty"
            count++
        }else{
            errors.type = "" 
        }
    
        this.setState({errors});
        return count == 0;
    }
    
    clearAll = () => {
        this.state = {
            name: '',
            address: '',
            location: '',
            contactNumber: '',
            type: '',
            files: [],
            errors: {}
        }
    }
}

export default (withRouter)(EditVenue);