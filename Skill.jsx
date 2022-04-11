/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

window.skillLevelAllOptions = [
    "Beginner",
    "Intermediate",
    "Expert"
];

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        let skillData = props.skillData ?
            Object.assign({}, props.skillData)
            : {
                skills: []
            };

        this.state = {
            showAddSection: false,
            newskill: skillData,
            skill: "",
            editSkill: "",
            skillLevel: "",
            editSkillLevel: "",
            isDeleted: false,
            editDataIndex: Infinity
        };

        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveSkill = this.saveSkill.bind(this)
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

    saveSkill() {
        let newSkillData = {};
        newSkillData.name = this.state.skill;
        newSkillData.level = this.state.skillLevel

        let data = Object.assign([], this.props.skillData);

        data.push(newSkillData);

        this.setState({
            newSkill: data,
            skill: "",
            skillLevel: "",
        });

        let uploadData = { skills: data };
        this.props.updateProfileData(uploadData);
    }

    targetData(index, Skill) {
        this.setState({
            editDataIndex: index,
            editSkill: Skill.name,
            editSkillLevel: Skill.level
        })
    }

    deleteData(index) {
        let newSkillData = this.props.skillData;
        newSkillData.splice(index, 1);
        const newData = {
            skills: newSkillData,
        };
        this.props.updateProfileData(newData);
    }

    updateEdit(index) {
        let newSkillData = this.props.skillData;
        newSkillData[index] = {
            name: this.state.editSkill,
            level: this.state.editSkillLevel
        }
        const newData = {
            skills: newSkillData,
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
       const skillLevelOptions = skillLevelAllOptions.map((x) => (
           <option key={x} value={x}>
               {x}
           </option>
       ));
       return (
           <React.Fragment>
               {this.state.showAddSection &&
                   <div className="row">
                       <div className="five wide column">
                           <div className="field">
                               <label></label>
                               <ChildSingleInput
                                   inputType="text"
                                   name="skill"
                                   value={this.state.skill}
                                   controlFunc={this.handleChange}
                                   maxLength={20}
                                   placeholder="Add Skill"
                                   errorMessage="Please enter a valid skill"
                               />
                           </div>
                       </div>
                       <div className="five wide column">
                           <div className="field">
                               <label></label>
                               <select
                                   className="ui right labeled dropdown"
                                   placeholder="Skill Level"
                                   value={this.state.skillLevel}
                                   onChange={this.handleChange}
                                   name="skillLevel"
                               >
                                   <option value="">Skill Level</option>
                               {skillLevelOptions}
                               </select>
                           </div>
                       </div>
                       <button type="button" className="ui teal button" onClick={this.saveSkill}>Save</button>
                       <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>
                   </div>}
               <div className="row">
                   <div className="sixteen wide column">
                       <Table singleLine>
                           <Table.Header>
                               <Table.Row>
                                   <Table.HeaderCell>Skill</Table.HeaderCell>
                                   <Table.HeaderCell>Level</Table.HeaderCell>
                                   <Table.HeaderCell><button type="button" className="ui teal right floated button" onClick={this.openAdd}>+ Add New</button></Table.HeaderCell>
                               </Table.Row>
                           </Table.Header>
                           <Table.Body>
                               {this.props.skillData.map((skill, index) => (
                                   this.state.editDataIndex === index ?
                                       <Table.Row key={skill.id}>
                                           <Table.Cell className="five wide column">
                                               <div className="field">
                                                   <label></label>
                                                   <ChildSingleInput
                                                       inputType="text"
                                                       name="editSkill"
                                                       value={this.state.editSkill}
                                                       controlFunc={this.handleChange}
                                                       maxLength={20}
                                                       placeholder="Add Skill"
                                                       errorMessage="Please enter a valid skill"
                                                   />
                                               </div>
                                           </Table.Cell>
                                           <Table.Cell className="five wide column">
                                               <div className="field">
                                                   <label></label>
                                                   <select
                                                       className="ui right labeled dropdown"
                                                       placeholder="Skill Level"
                                                       value={this.state.editSkillLevel}
                                                       onChange={this.handleChange}
                                                       name="editSkillLevel"
                                                   >
                                                       <option value="">Skill Level</option>
                                                       {skillLevelOptions}
                                                   </select>
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
                                       (<TableData skill={skill} index={index} toggleEdit={this.targetData} delete={this.deleteData} />)
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
        let skill = this.props.skill;
        let index = this.props.index;
        return (
            <React.Fragment>
                <Table.Row key={skill.id}>
                    <Table.Cell>{skill.name}</Table.Cell>
                    <Table.Cell>{skill.level}</Table.Cell>
                    <Table.Cell textAlign="right">
                        <Icon
                            name="pencil"
                            className="right"
                            onClick={() => this.props.toggleEdit(index, skill)}
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

