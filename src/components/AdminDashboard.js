import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {insertVenue} from '../Controllers/Items';
import { withRouter } from 'react-router-dom';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);

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

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value });
        console.log(this.state.type);
     }

     onFormSubmit = (e) => {
         e.preventDefault();

         if(this.validate()) {
            insertVenue(this.state.files, 
                {name : this.state.name,
                address: this.state.address,
                location: this.state.location,
                contactNumber: this.state.contactNumber,
                type: this.state.type
            }).then(result => {
                this.clearAll();
                //Config.setToast("Venue Added Successfully");
                alert("Venue added Successfully");
                this.props.history.push("/allvenues")
            })
            .catch(err => {
                console.log(err);
                //Config.setErrorToast("Somthing Went Wrong!");
                alert("Somthing Went Wrong!");
            })
         }
     }

    render() {
        const {name, address, location, contactNumber, type, errors} = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                    <h2>Add Venues</h2>
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

                    <div className="col-md-12 mt-3">
                        <h6 className="form-label py-2">Add Images</h6>
                            <FilePond
                                ref={ref => (this.pond = ref)}
                                files={this.state.files}
                                allowMultiple={true}
                                onupdatefiles={fileItems => {
                                this.setState({
                                files: fileItems.map(fileItem => fileItem.file)
                                });
                                }}>
                            </FilePond>
                            {errors.images && errors.images.length > 0 &&
                            <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.images}</h4>}
                    </div>

                    <div className="col-md-12 mt-2">
                      <div className="d-flex">
                        <button
                          className="px-4 btn btn-dark mt-2 btn-sm bold-normal"
                          type="submit"
                        >
                          Add Venue
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                    </div>
                </div>
            </div>
        );
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

        if (this.state.files.length == 0) {
            errors.images = "At least one tag must be required"
            count++
        } else {
            errors.images = ""
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

export default (withRouter)(AdminDashboard);