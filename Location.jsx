import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Dropdown } from 'semantic-ui-react';
import { countries } from "../Employer/common.js";

export class Address extends React.Component {
    constructor(props) {
        super(props)
        const addressData = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                number: "",
                street: "",
                suburb: "",
                country: "",
                city: "",
                postCode: 0
            }
        this.state = {
            showEditSection: false,
            newAddress: addressData
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.saveAddress = this.saveAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const addressData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: addressData
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
    }

    saveAddress() {
        const data = { address: this.state.newAddress}
        //const data = Object.assign({}, this.state.newAddress)
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let countriesOptions = Object.keys(countries).map((x) => (
            <option key={x} value={x}>
                {x}
            </option>
        ));
        let citiesOptions = [];
        let selectedCountry = this.state.newAddress.country;

        if (selectedCountry != "" && selectedCountry != null) {

            var popCities = countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions =
            <select
                className="ui dropdown"
                placeholder="City"
                value={this.state.newAddress.city}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select a town or city</option>
                {popCities}
            </select>
        }
        //console.log(addressData);

        return (
            <div className="ui grid">

                <div className="row">
                    <div className="four wide column">
                        <ChildSingleInput
                        inputType="text"
                        label="Number"
                        name="number"
                        value={this.state.newAddress.number}
                        controlFunc={this.handleChange}
                        maxLength={10}
                        placeholder="Enter your address number"
                        errorMessage="Please enter a valid address number"
                        />
                    </div>

                    <div className="eight wide column">
                        <ChildSingleInput
                        inputType="text"
                        label="Street"
                        name="street"
                        value={this.state.newAddress.street}
                        controlFunc={this.handleChange}
                        maxLength={150}
                        placeholder="Enter your street name"
                        errorMessage="Please enter a valid street name"
                        />
                    </div>

                    <div className="four wide column">
                        <ChildSingleInput
                        inputType="text"
                        label="Suburb"
                        name="suburb"
                            value={this.state.newAddress.suburb}
                        controlFunc={this.handleChange}
                        maxLength={50}
                            placeholder="Enter your suburb"
                            errorMessage="Please enter a valid suburb"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="six wide column">
                        <div className="field">
                            <label>Country</label>
                            {/*<Dropdown placeholder="Country" search selection options={countriesOptions} onChange={this.handleChange} value={this.state.newAddress.country}/>*/}
                            <select
                                className="ui right labeled dropdown"
                                placeholder="Country"
                                value={this.state.newAddress.country}
                                onChange={this.handleChange}
                                name="country"
                            >
                                <option value="">Select a country</option>
                                {countriesOptions}
                            </select>
                        </div>
                    </div>

                    <div className="six wide column">
                        <div className="field">
                            <label>Country</label>
                            {citiesOptions}
                        </div>
                    </div>

                    <div className="four wide column">
                        <ChildSingleInput
                            inputType="number"
                            label="postCode"
                            name="postCode"
                            value={this.state.newAddress.postCode}
                            controlFunc={this.handleChange}
                            maxLength={10}
                            placeholder="Enter your Post Code"
                            errorMessage="Please enter a valid Post Code"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="eight wide column">
                        <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                    </div>
                </div>

            </div>

        )
    }

    renderDisplay() {
        let address = this.props.addressData ? `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.postCode}` : ""
        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {address}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
            )
    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props);
        
        const nationalityData = props.nationalityData ?
            Object.assign({}, props.nationalityData)
            : {
                nationality: ""
            }

        this.state = {
            newNationality: nationalityData
        }

        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(event) {
        const data = Object.assign({}, this.state.newNationality)
        data[event.target.name] = event.target.value
        this.setState({
            newNationality: data
        })
        let saveData = {
            nationality: event.target.value,

        }
        this.props.saveProfileData(saveData);
    }

    
    render() {
        let nationalitiesOptions = Object.keys(countries).map((x) => (
            <option key={x} value={x}>
                {x}
            </option>
        ));
     
        return (
            <div className="ten wide column">

                <div className="field">
                    <label>Nationality</label>
                    {/*<Dropdown placeholder="Country" search selection options={countriesOptions} onChange={this.handleChange} value={this.state.newAddress.country}/>*/}
                    <select
                        className="ui right labeled dropdown"
                        placeholder="Nationality"
                        value={this.props.nationalityData}
                        onChange={this.handleChange}                        
                        name="nationality"
                    >
                        <option value="">Select your Nationality</option>
                        {nationalitiesOptions}
                    </select>
                </div>
            </div>
        )

    }


}