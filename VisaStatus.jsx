import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

window.visaTypeAllOptions = [
    "Citizen",
    "Permanent Resident",
    "Work Visa",
    "Student Visa"
];


export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props);
        //debugger;
        console.log(this.props.visaStatus);
        const today = new Date();
        let visaData = props.visaStatus ?
            Object.assign({}, props.visaStatus)
            : {
                visaStatus: ""
            }
        visaData = props.visaExpiryDate !== "" ?
            Object.assign({}, props.visaExpiryDate)
            : {
                visaExpiryDate: today.toISOString().split('T')[0]
            }
        //debugger;
        //console.log(this.props.visaStatus)
        this.state = {
            showExpiry: false,
            newVisaStatus: visaData,
            visaStatus: "",
            visaExpiryDate: props.visaExpiryDate ? props.visaExpiryDate : "",
            edited: false
        }


        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveVisa = this.saveVisa.bind(this);
        //this.showExpiryTable = this.showExpiryTable.bind(this);
    }

    handleChange(event) {
        //debugger;
        //console.log(this.props.visaExpiryDate.split('T')[0].toLocaleString('en-US', { timeZone: 'Pacific/fiji' }));
        let data = Object.assign({}, this.state.newVisaStatus)
        data.visaStatus = this.props.visaStatus;
        data[event.target.name] = event.target.value;
        this.setState({
            [event.target.name]: event.target.value
        })
        let x = data.visaStatus;
        console.log(x)
        this.setState({
            newVisaStatus: data
        })

        //console.log(this.state.newVisaStatus.visaStatus)
        if (x === "Permanent Resident" || x === "Citizen") {
            this.setState({
                showExpiry: false
            });
            data.visaExpiryDate = null;
            this.setState({
                newVisaStatus: data,
                edited: true
            })
            this.props.saveProfileData(data);
        }
        else {
            this.setState({
                newVisaStatus: data,
                showExpiry: true,
                edited: true
            })
        }
    }

    handleChange2(event) {
        //console.log(this.props.visaExpiryDate.split('T')[0]);
        let data = Object.assign({}, this.state.newVisaStatus)
        data.visaExpiryDate = event.target.value;       
        this.setState({
            newVisaStatus: data
        })
    }

    saveVisa() {
        //debugger;
        const data = Object.assign({}, this.state.newVisaStatus)
        data.visaStatus = this.state.visaStatus !== "" ? this.state.visaStatus : this.props.visaStatus;
        data.visaExpiryDate = this.state.newVisaStatus.visaExpiryDate !== "" ? this.state.newVisaStatus.visaExpiryDate : this.props.visaStatus;
        //data.visaExpiryDate = this.state.visaExpiryDate;
        console.log(data.visaExpiryDate)
        this.setState({
            newVisaStatus: data
        })

        this.props.saveProfileData(data)

    }



    render() {

        let visaOptions = visaTypeAllOptions.map((x) => (
            <option key={x} value={x}>
                {x}
            </option>
        ));

        let visaExpiryDate = this.props.visaExpiryDate
        //debugger;
        

        //debugger;
        let showDate = false;
        if (this.state.newVisaStatus.visaStatus === "Citizen" || this.state.newVisaStatus.visaStatus === "Permanent Resident") {
            showDate = false;
        }
        if (this.state.newVisaStatus.visaStatus === "Work Visa" || this.state.newVisaStatus.visaStatus === "Student Visa") {
            showDate = true;
        }
        let edited = this.state.edited;
        let notEdited = !edited;

        let propsDate = false;
        if (this.props.visaStatus === "Citizen" || this.props.visaStatus === "Permanent Resident") {
            propsDate = false;
        }
        if (this.props.visaStatus === "Work Visa" || this.props.visaStatus === "Student Visa") {
            propsDate = true;
        }
        console.log(showDate);

        return (
            <React.Fragment>

                {edited ?
                    <React.Fragment>
                        <div className="row">
                            <div className="six wide column">

                                <div className="field">
                                    <label>Visa Type</label>
                                    {/*<Dropdown placeholder="Country" search selection options={countriesOptions} onChange={this.handleChange} value={this.state.newAddress.country}/>*/}
                                    <select
                                        className="ui right labeled dropdown"
                                        placeholder="visaStatus"
                                        value={this.state.newVisaStatus.visaStatus}
                                        onChange={this.handleChange}
                                        name="visaStatus"
                                    >
                                        <option value="">Select your Visa Type</option>
                                        {visaOptions}
                                    </select>
                                </div>
                            </div>
                            {showDate && <React.Fragment>
                                <div className="six wide column">
                                    <div className="field">
                                        <label>Visa expiry date</label>
                                        <ChildSingleInput
                                            inputType="date"
                                            name="visaExpiryDate"
                                            value={this.state.newVisaStatus.visaExpiryDate}
                                            controlFunc={this.handleChange2}
                                            maxLength={10}
                                            placeholder="Edit visaExpiryDate"
                                            errorMessage="Please enter a valid visaExpiryDate"
                                        />
                                    </div>
                                </div>


                                <div className="field">
                                    <label>&nbsp;</label>
                                    <button type="button" className="ui basic blue button" onClick={() => this.saveVisa()}>Save</button>
                                </div>
                            </React.Fragment>
                            }




                        </div>
                    </React.Fragment> :
                    <div className="row">
                        <div className="six wide column">

                            <div className="field">
                                <label>Visa Type</label>
                                {/*<Dropdown placeholder="Country" search selection options={countriesOptions} onChange={this.handleChange} value={this.state.newAddress.country}/>*/}
                                <select
                                    className="ui right labeled dropdown"
                                    placeholder="visaStatus"
                                    value={this.props.visaStatus}
                                    onChange={this.handleChange}
                                    name="visaStatus"
                                >
                                    <option value="">Select your Visa Type</option>
                                    {visaOptions}
                                </select>
                            </div>
                        </div>
                        {propsDate && <React.Fragment>
                            <div className="six wide column">
                                <div className="field">
                                    <label>Visa expiry date</label>
                                    <ChildSingleInput
                                        inputType="date"
                                        name="visaExpiryDate"
                                        value={new Date(this.props.visaExpiryDate).toLocaleString('sv-SE', { timeZone: 'Pacific/auckland' }).split(' ')[0]}
                                        controlFunc={this.handleChange}
                                        maxLength={10}
                                        placeholder="Edit visaExpiryDate"
                                        errorMessage="Please enter a valid visaExpiryDate"
                                    />
                                </div>
                            </div>


                            <div className="field">
                                <label>&nbsp;</label>
                                <button type="button" className="ui basic blue button" onClick={() => this.saveVisa()}>Save</button>
                            </div>
                        </React.Fragment>
                        }
                    </div>
                }
            </React.Fragment>
        )
    }
}