/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        let experienceData = props.experienceData ?
            Object.assign({}, props.experienceData)
            : {
                experience: []
            };
        console.log(experienceData);
        const today = new Date();

        this.state = {
            showAddSection: false,
            newExperience: experienceData,
            company: "",
            position: "",
            start: today.toISOString().split('T')[0],
            end: today.toISOString().split('T')[0],
            responsibilities: "",
            editCompany: "",
            editPosition: "",
            editStart: "",
            editEnd: "",
            editResponsibilities: "",
            isDeleted: false,
            editDataIndex: Infinity
        };

        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveExperience = this.saveExperience.bind(this)
        this.targetData = this.targetData.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.deleteData = this.deleteData.bind(this)
    };

    openAdd() {
        this.setState({
            showAddSection: true,
        })
    }

    closeAdd() {
        this.setState({
            showAddSection: false
        })
    }

    handleChange(event) {
        console.log(event.target)
        console.log(event.target.value)
        this.setState({
            //setState() with a dynamic key name
            //Computed property names
            [event.target.name]: event.target.value
        })
    }

    saveExperience() {
       // debugger;
        let newExperienceData = {};
        newExperienceData.company = this.state.company;
        newExperienceData.position = this.state.position;
        newExperienceData.start = this.state.start.split('T')[0];
        newExperienceData.end = this.state.end.split('T')[0];
        newExperienceData.responsibilities = this.state.responsibilities;

        let data = Object.assign([], this.props.experienceData);

        console.log(newExperienceData);

        data.push(newExperienceData);

        const today = new Date();
        this.setState({
            newExperience: data,
            company: "",
            position: "",
            start: today,
            end: today,
            responsibilities: ""
        });

        let uploadData = { experience: data };
        this.props.updateProfileData(uploadData);
    }

    targetData(index, Experience) {
        this.setState({
            editDataIndex: index,
            editCompany: Experience.company,
            editPosition: Experience.position,
            editStart: Experience.start,
            editEnd: Experience.end,
            editResponsibilities: Experience.responsibilities
        })
    }

    deleteData(index) {
        let newExperienceData = this.props.experienceData;
        newExperienceData.splice(index, 1);
        const newData = {
            experience: newExperienceData,
        };
        this.props.updateProfileData(newData);
    }

    updateEdit(index) {
        //debugger;
        let newExperienceData = this.props.experienceData;
        newExperienceData[index] = {
            company: this.state.editCompany,
            position: this.state.editPosition,
            start: this.state.editStart.split('T')[0],
            end: this.state.editEnd.split('T')[0],
            responsibilities: this.state.editResponsibilities
        }
        const newData = {
            experience: newExperienceData,
        };
        this.props.updateProfileData(newData);
        this.setState({
            editDataIndex: Infinity
        })
    }

    closeEdit() {
        this.setState({
            editDataIndex: Infinity
        })
    }


    
    render() {
       
        return (
            <React.Fragment>
                {this.state.showAddSection &&
                    <React.Fragment>
                        <div className="row">
                            <div className="eight wide column">
                                <div className="field">
                                    <label>Company:</label>
                                    <ChildSingleInput
                                        inputType="text"
                                        name="company"
                                        value={this.state.company}
                                        controlFunc={this.handleChange}
                                        maxLength={30}
                                        placeholder="Add company"
                                        errorMessage="Please enter a valid company"
                                    />
                                </div>
                            </div>
                            <div className="eight wide column">
                                <div className="field">
                                    <label>Position:</label>
                                    <ChildSingleInput
                                        inputType="text"
                                        name="position"
                                        value={this.state.position}
                                        controlFunc={this.handleChange}
                                        maxLength={30}
                                        placeholder="Add position"
                                        errorMessage="Please enter a valid position"
                                    />
                                </div>
                            </div>
                            {/*<button type="button" className="ui teal button" onClick={this.saveSkill}>Save</button>*/}
                            {/*<button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>*/}
                        </div>
                        <div className="row">
                            <div className="eight wide column">
                                <div className="field">
                                    <label>Start Date:</label>
                                    <ChildSingleInput
                                        inputType="date"
                                        name="start"
                                    value={this.state.start}
                                        controlFunc={this.handleChange}
                                        maxLength={10}
                                        placeholder="Add startDate"
                                        errorMessage="Please enter a valid startDate"
                                    />
                                </div>
                            </div>
                            <div className="eight wide column">
                                <div className="field">
                                <label>End Date:</label>
                                    <ChildSingleInput
                                        inputType="date"
                                        name="end"
                                        value={this.state.end}
                                        controlFunc={this.handleChange}
                                        maxLength={10}
                                        placeholder="Add endDate"
                                        errorMessage="Please enter a valid endDate"
                                    />
                                </div>
                            </div>
                            {/*<button type="button" className="ui teal button" onClick={this.saveSkill}>Save</button>*/}
                            {/*<button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>*/}
                        </div>
                        <div className="row">
                            <div className="sixteen wide column">
                                <div className="field">
                                    <label>Responsibilities:</label>
                                    <ChildSingleInput
                                        inputType="text"
                                    name="responsibilities"
                                        value={this.state.responsibilities}
                                        controlFunc={this.handleChange}
                                        maxLength={30}
                                        placeholder="Add responsibilities"
                                        errorMessage="Please enter a valid responsibilities"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="eight wide column">
                                <button type="button" className="ui teal button" onClick={this.saveExperience}>Save</button>
                                <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>
                            </div>
                        </div>
                    </React.Fragment>
                }
                <div className="row">
                    <div className="sixteen wide column">
                        <Table singleLine>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Company</Table.HeaderCell>
                                    <Table.HeaderCell>Position</Table.HeaderCell>
                                    <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                    <Table.HeaderCell>Start</Table.HeaderCell>
                                    <Table.HeaderCell>End</Table.HeaderCell>
                                    <Table.HeaderCell><button type="button" className="ui teal right floated button" onClick={this.openAdd}>+ Add New</button></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.props.experienceData.map((experience, index) => (
                                    this.state.editDataIndex === index ?
                                        <Table.Row key={experience.id}>
                                            <Table.Cell className="two wide column">
                                                <div className="field">
                                                    <label></label>
                                                    <ChildSingleInput
                                                        inputType="text"
                                                        name="editCompany"
                                                        value={this.state.editCompany}
                                                        controlFunc={this.handleChange}
                                                        maxLength={30}
                                                        placeholder="Edit Company"
                                                        errorMessage="Please enter a valid company"
                                                    />
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell className="two wide column">
                                                <div className="field">
                                                    <label></label>
                                                    <ChildSingleInput
                                                        inputType="text"
                                                        name="editPosition"
                                                        value={this.state.editPosition}
                                                        controlFunc={this.handleChange}
                                                        maxLength={30}
                                                        placeholder="Edit editPosition"
                                                        errorMessage="Please enter a valid editPosition"
                                                    />
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell className="two wide column">
                                                <div className="field">
                                                    <label></label>
                                                    <ChildSingleInput
                                                        inputType="date"
                                                        name="editStart"
                                                        value={this.state.editStart.split('T')[0]}
                                                        controlFunc={this.handleChange}
                                                        maxLength={10}
                                                        placeholder="Edit StartDate"
                                                        errorMessage="Please enter a valid StartDate"
                                                    />
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell className="two wide column">
                                                <div className="field">
                                                    <label></label>
                                                    <ChildSingleInput
                                                        inputType="date"
                                                        name="editEnd"
                                                        value={this.state.editEnd.split('T')[0]}
                                                        controlFunc={this.handleChange}
                                                        maxLength={10}
                                                        placeholder="Edit editEndDate"
                                                        errorMessage="Please enter a valid editEndDate"
                                                    />
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell className="two wide column">
                                                <div className="field">
                                                    <label></label>
                                                    <ChildSingleInput
                                                        inputType="text"
                                                        name="editResponsibilities"
                                                        value={this.state.editResponsibilities}
                                                        controlFunc={this.handleChange}
                                                        maxLength={20}
                                                        placeholder="Edit editResponsibilities"
                                                        errorMessage="Please enter a valid editResponsibilities"
                                                    />
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell>
                                                {/*pass a parameter to an event handler or callback?*/}
                                                {/*<button onClick={() => this.handleClick(id)} /> = <button onClick={this.handleClick.bind(this, id)} />*/}
                                                <button type="button" className="ui basic blue button" onClick={() => this.updateEdit(index)}>Update</button>
                                                <button type="button" className="ui basic red button" onClick={this.closeEdit}>Cancel</button>
                                            </Table.Cell>
                                        </Table.Row>
                                        :
                                        (<TableData experience={experience} index={index} toggleEdit={this.targetData} delete={this.deleteData} />)
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </div>

            </React.Fragment>
            )
        
    }
}

class TableData extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        let experience = this.props.experience;
        let index = this.props.index;
        return (
            <React.Fragment>
                <Table.Row key={experience.id}>
                    <Table.Cell>{experience.company}</Table.Cell>
                    <Table.Cell>{experience.position}</Table.Cell>
                    <Table.Cell>{experience.responsibilities}</Table.Cell>
                    <Table.Cell>{formatDateString(experience.start)}</Table.Cell>
                    <Table.Cell>{formatDateString(experience.end)}</Table.Cell>
                    <Table.Cell textAlign="right">
                        <Icon
                            name="pencil"
                            className="right"
                            onClick={() => this.props.toggleEdit(index, experience)}
                        />
                        <Icon
                            name="close"
                            className="right"
                            onClick={() => this.props.delete(index)}
                        />
                    </Table.Cell>
                </Table.Row>
            </React.Fragment>
        )
    }
}

const formatDateString = (date) => {
    let event = new Date(date);
    let Str = event.toString().split(" ");
    let formatedStr = Str[2] + "th " + Str[1] + ", " + Str[3];
    return formatedStr;
};
