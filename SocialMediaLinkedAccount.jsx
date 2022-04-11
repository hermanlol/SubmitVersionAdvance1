/* Social media JSX */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button, Icon } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const data = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }

        this.state = {
            showEditSection: false,
            newLinkedAccounts: data
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAccount = this.saveAccount.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newLinkedAccounts);
        data[event.target.name] = event.target.value;
        this.setState({ newLinkedAccounts: data });
    }


    openEdit() {
        const accounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newLinkedAccounts: accounts
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }



    saveAccount() {
        const data = {
            linkedAccounts: this.state.newLinkedAccounts,
        };
        this.props.saveProfileData(data);
        this.closeEdit()
    }



    render() {
        
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <div className="ui sixteen wide column">
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newLinkedAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={150}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid Url"
                
                />

                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newLinkedAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={150}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a valid Url"
                />
                <button type="button" className="ui teal button" onClick={this.saveAccount}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }
    renderDisplay() {
        console.log(this.props.linkedAccounts.linkedIn)
            return (
                <div className="ui sixteen wide column">
                    <Button color="linkedin" floated="left" className="social-media" href={this.props.linkedAccounts.linkedIn}>
                        <Icon name="linkedin" />LinkedIn
                    </Button>
                    <Button color="black" floated="left" className=" social-media" href={this.props.linkedAccounts.github}>
                        <Icon name="github square" /> GitHub
                    </Button>
                    <Button color="black" floated="right" onClick={this.openEdit}>Edit</Button>
                </div>
                )
        }
    }

