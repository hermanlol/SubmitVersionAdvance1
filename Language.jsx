/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { countries } from "../Employer/common.js";
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

window.languageLevelAllOptions = [
    "Basic",
    "Conversational",
    "Fluent",
    "Native/Bilingual"
];


export default class Language extends React.Component {
    constructor(props) {
        super(props);
        //function from props
        //languageData and updateProfileData
        
        let languageData = props.languageData ?
            Object.assign({}, props.languageData)
            : {
                languages: []
            };
        //console.log(languageData);

        this.state = {
            showAddSection: false,
            newLanguage: languageData,
            language: "",
            editLanguage: "",
            languageLevel: "",
            editLanguageLevel: "",
            isDeleted: false,
            editDataIndex: Infinity
        }

        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveLanguage = this.saveLanguage.bind(this)
        this.targetData = this.targetData.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.deleteData = this.deleteData.bind(this)

    }

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
        //TODO
        console.log(event.target)
        console.log(event.target.value)
        this.setState({
            //setState() with a dynamic key name
            //Computed property names
            [event.target.name] : event.target.value
        })
        
    }

    saveLanguage() {
        //TODO
        //debugger;
        let newLanguageData = {};
        newLanguageData.name = this.state.language;
        newLanguageData.level = this.state.languageLevel
        //console.log(newLanguageData);
        //console.log(this.state.newLanguage);
        //how to push into state array
        //this.setState({ myArray: [...this.state.myArray, 'new value'] }) //simple value
        //this.setState({ myArray: [...this.state.myArray, ...[1, 2, 3]] }) //another array
        //this.setState({
        //    newLanguage: this.state.newLanguage.concat(newLanguageData)
        //});
        //this.setState({
        //    newLanguage: this.state.newLanguage.push.apply(this.state.newLanguage, newLanguageData)
        //})
        //console.log(this.state.newLanguage);
        let data = Object.assign([], this.props.languageData);
        //debugger;
        //console.log(data);
        data.push(newLanguageData);
        //console.log(data);
        this.setState({
            newLanguage: data,
            language: "",
            languageLevel: "",
        });
        let uploadData = { languages: data };
        this.props.updateProfileData(uploadData);
    }

    targetData(index, Language) {
        this.setState({
            editDataIndex: index,
            editLanguage: Language.name,
            editLanguageLevel: Language.level
        })
    }

    deleteData(index) {
        let newLanguageData = this.props.languageData;
        newLanguageData.splice(index, 1);
        const newData = {
            languages: newLanguageData,
        };
        this.props.updateProfileData(newData);
    }

    updateEdit(index) {
        let newLanguageData = this.props.languageData;
        newLanguageData[index] = {
            name: this.state.editLanguage,
            level: this.state.editLanguageLevel
        }
        const newData = {
            languages: newLanguageData,
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
        //debugger;
        //console.log(this.props.languageData);
        //console.log(this.state.newLanguage);
        const languageLevelOptions = languageLevelAllOptions.map((x) => (
            <option key={x} value={x}>
                {x}
            </option>
        ));

        //Table data
        //console.log(this.props.languageData);
        //let tableData = this.props.languageData.map((language) => (
        //    <Table.Row key={language.id}>
        //        <Table.Cell>{language.name}</Table.Cell>
        //        <Table.Cell>{language.level}</Table.Cell>
        //        <Table.Cell textAlign="right">
        //            <Icon
        //                name="pencil"
        //                className="right"
        //            />
        //            <Icon
        //                name="close"
        //                className="right"
        //            />
        //        </Table.Cell>
        //    </Table.Row>
        //));
        //let editData = 
        //debugger;
        //console.log(tableData);
        return (
            <React.Fragment>
                {this.state.showAddSection &&
                    <div className="row">
                        <div className="five wide column">
                            <div className="field">
                                <label></label>
                                <ChildSingleInput
                                inputType="text"
                                name="language"
                                value={this.state.language}
                                controlFunc={this.handleChange}
                                maxLength={20}
                                placeholder="Add Language"
                                errorMessage="Please enter a valid language"
                                />
                            </div>
                        </div>
                        <div className="five wide column">
                            <div className="field">
                                    <label></label>
                                    <select
                                    className="ui right labeled dropdown"
                                    placeholder="Language Level"
                                    value={this.state.languageLevel}
                                    onChange={this.handleChange}
                                    name="languageLevel"
                                    >
                                    <option value="">Language Level</option>
                                    {languageLevelOptions}
                                    </select>
                            </div>
                        </div>
                        <button type="button" className="ui teal button" onClick={this.saveLanguage}>Save</button>
                        <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>
                    </div>}
                <div className="row">
                    <div className="sixteen wide column">
                        <Table singleLine>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Language</Table.HeaderCell>
                                    <Table.HeaderCell>Level</Table.HeaderCell>
                                    <Table.HeaderCell><button type="button" className="ui teal right floated button" onClick={this.openAdd}>Add New</button></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.props.languageData.map((language, index) => (
                                    this.state.editDataIndex === index ?
                                        <Table.Row key={language.id}>
                                            <Table.Cell className="five wide column">
                                                <div className="field">
                                                    <label></label>
                                                    <ChildSingleInput
                                                    inputType="text"
                                                    name="editLanguage"
                                                    value={this.state.editLanguage}
                                                    controlFunc={this.handleChange}
                                                    maxLength={20}
                                                    placeholder="Add Language"
                                                    errorMessage="Please enter a valid language"
                                                        />
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className="five wide column">
                                                <div className="field">
                                                    <label></label>
                                                    <select
                                                        className="ui right labeled dropdown"
                                                        placeholder="Language Level"
                                                        value={this.state.editLanguageLevel}
                                                        onChange={this.handleChange}
                                                        name="editLanguageLevel"
                                                    >
                                                        <option value="">Language Level</option>
                                                        {languageLevelOptions}
                                                    </select>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {/*pass a parameter to an event handler or callback?*/}
                                                {/*<button onClick={() => this.handleClick(id)} /> = <button onClick={this.handleClick.bind(this, id)} />*/}
                                                <button type="button" className="ui basic blue button" onClick={()=> this.updateEdit(index)}>Update</button>
                                                <button type="button" className="ui basic red button" onClick={this.closeEdit}>Cancel</button>
                                            </Table.Cell>
                                        </Table.Row>
                                        :
                                        (<TableData language={language} index={index} toggleEdit={this.targetData} delete={this.deleteData} />)
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
        let language = this.props.language;
        let index = this.props.index;
        return (
            <React.Fragment>
                <Table.Row key={language.id}>
                    <Table.Cell>{language.name}</Table.Cell>
                    <Table.Cell>{language.level}</Table.Cell>
                    <Table.Cell textAlign="right">
                        <Icon
                            name="pencil"
                            className="right"
                            onClick={() => this.props.toggleEdit(index, language)}
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