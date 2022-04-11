import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';
import { Popup, Dropdown, Radio } from 'semantic-ui-react';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        const newStatus = props.status ?
            Object.assign({}, props.status)
            : {
                status: "",
                availableDate: null
            }
        this.state = {
            newJobSeekingStatus: newStatus,
            status: "",
            availableDate: null,
            edit: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, { value }) {
        debugger;
        let statusData = value;
        this.setState({
            edit: true,
            status: statusData
        })
        console.log(this.state.status);
        let data = {};
        data.status = statusData;
        data.availableDate = null;

        let saveData = {
            JobSeekingStatus: data
        }
        //this.props.updateProfileData(saveData);
        this.props.saveProfileData(saveData);
        //this.forceUpdate();
        //window.location.reload(false);
    }

    render() {

        console.log(this.state.edit);
        return (
            <React.Fragment>
                {
                    this.state.edit ?
                        <React.Fragment>
                            <div className="ui grid">
                                <br/>
                                <h5>Current Status</h5>
                                <div className="row">
                                    <div className="ui sixteen wide column">
                                        <Radio
                                            name="jobSeekingStatus"
                                            label="Actively looking for a job"
                                            value="Actively looking for a job"
                                            checked={this.state.status === "Actively looking for a job"}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ui sixteen wide column">
                                        <Radio
                                            name="jobSeekingStatus"
                                            label="Not looking for a job at the moment"
                                            value="Not looking for a job at the moment"
                                            checked={
                                                this.state.status ===
                                                "Not looking for a job at the moment"
                                            }
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ui sixteen wide column">
                                        <Radio
                                            name="jobSeekingStatus"
                                            label="Currently employeed but open to offers"
                                            value="Currently employeed but open to offers"
                                            checked={
                                                this.state.status ===
                                                "Currently employeed but open to offers"
                                            }
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ui sixteen wide column">
                                        <Radio
                                            name="jobSeekingStatus"
                                            label="Will be available on late date"
                                            value="Will be available on late date"
                                            checked={
                                                this.state.status === "Will be available on late date"
                                            }
                                            onClick={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>

                        :

                        <React.Fragment>
                            <div className="ui grid">
                                <br />
                                <h5>Current Status</h5>
                                <div className="row">
                                    <div className="ui sixteen wide column">
                                        <Radio
                                            name="jobSeekingStatus"
                                            label="Actively looking for a job"
                                            value="Actively looking for a job"
                                            checked={this.props.status.status === "Actively looking for a job"}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ui sixteen wide column">
                                        <Radio
                                            name="jobSeekingStatus"
                                            label="Not looking for a job at the moment"
                                            value="Not looking for a job at the moment"
                                            checked={
                                                this.props.status.status ===
                                                "Not looking for a job at the moment"
                                            }
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ui sixteen wide column">
                                        <Radio
                                            name="jobSeekingStatus"
                                            label="Currently employeed but open to offers"
                                            value="Currently employeed but open to offers"
                                            checked={
                                                this.props.status.status ===
                                                "Currently employeed but open to offers"
                                            }
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="ui sixteen wide column">
                                        <Radio
                                            name="jobSeekingStatus"
                                            label="Will be available on late date"
                                            value="Will be available on late date"
                                            checked={
                                                this.props.status.status === "Will be available on late date"
                                            }
                                            onClick={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>}
            </React.Fragment>
        )

    }
}