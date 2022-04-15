/* Photo upload section */
import React, { useState, Component } from "react";
import { Button, Image, Icon } from "semantic-ui-react";
import Cookies from "js-cookie";

export default class PhotoUpload extends Component {
    constructor(props) {
        //const [load, setLoad] = React.useState(false);
        //let [isWaiting, setWaiting] = useState(false);
        super(props);
        this.state = {
            src: "",
            selectedFile: null,
            selectedFileName: "",
            imageSrc: "",
            imageId: "",
            showUpload: false,
            disableButton: false
        };

        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.disable = this.disable.bind(this);
        this.maxFileSize = 3000000;
        this.acceptedFileType = [
            "image/jpeg",
            "image/jpg",
            "image/png",
        ];
    }

    handleChangeImage() {
        document.getElementById("imgupload").click();
    }

    fileSelectedHandler(event) {
        //SET DEFAULT IMG DETAILS1
        let localSelectedFile = this.state.selectedFile;
        let localSelectedFileName = this.state.selectedFileName;
        let localImageSrc = this.state.imageSrc;

        if (
            event.target.files[0].size > this.maxFileSize ||
            this.acceptedFileType.indexOf(event.target.files[0].type) == -1
        ) {
            TalentUtil.notification.show(
                "Max file size is 3 MB and only supported file types .jpg, .jpeg, .png.",
                "error",
                null,
                null
            );
        } else {
            localSelectedFile = event.target.files[0];
            localSelectedFileName = event.target.files[0].name;
            localImageSrc = URL.createObjectURL(event.target.files[0]);
        }
        //debugger;
        this.setState({
            selectedFile: localSelectedFile,
            selectedFileName: localSelectedFileName,
            imageSrc: localImageSrc,
            src: localImageSrc,
            showUpload: true,
        });

        //console.log(this.state);
    }
    disable() {
        //debugger;
        this.setState({
            disableButton: true,
        });
        this.handleUpload();
    }
    handleUpload() {
        //debugger;
        let but = document.getElementById('uploadButton');
        but.disabled = true;
        //this.setState({
        //    data: data
        //}, () => this.props.consumeData(this.state.data));
        let data = new FormData();
        data.append("file", this.state.selectedFile);
        var cookies = Cookies.get("talentAuthToken");
        $.ajax({
            url: this.props.savePhotoUrl,
            headers: {
                Authorization: "Bearer " + cookies,
            },
            type: "POST",
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.success) {
                    const data = {
                        profilePhoto: this.state.localSelectedFileName,
                        profilePhotoUrl: this.state.localImageSrc,
                    };
                    TalentUtil.notification.show(
                        "Profile photo updated sucessfully",
                        "success",
                        null,
                        null
                    );
                    this.setState(
                        {
                            showUpload: false,
                        },
                        this.props.updateProfileData(data)
                    );
                    but.disabled = false;
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null);
                    but.disabled = false;
                }
            }.bind(this),
            error: function (res, status, error) {
                TalentUtil.notification.show(
                    "There is an error when updating Images - " + error,
                    "error",
                    null,
                    null
                );
            },
        });
        this.setState({
            disableButton: false,
        })
    }

    render() {
        //debugger;
        let imgSrc = this.state.showUpload ? this.state.src : this.props.imageId;
        let imgGen = this.state.src ? this.state.src : this.props.imageId;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="ui sixteen wide column">
                        {imgGen ? <img
                            src={imgSrc ? imgSrc : this.state.src}
                            style={{
                                height: 112,
                                width: 112,
                                borderRadius: 55,
                                borderColor: "black",
                                borderStyle: "solid",
                                borderWidth: 1,
                                alignContent: "right",
                                verticalAlign: "top",
                            }}
                            onClick={this.handleChangeImage}
                        /> :
                            <Icon
                                name="camera retro"
                                size="huge"
                                circular
                                onClick={this.handleChangeImage} />}


                    </div>
                </div>
                {this.state.showUpload ? (
                    <div className="row">
                        <div className="ui sixteen wide column">
                            <br />
                            <button
                                id="uploadButton"
                                type="button"
                                className="ui black left floated button"

                                onClick={this.handleUpload}
                            >
                                <Icon name="upload" />
                                Upload
                            </button>
                        </div>
                    </div>
                ) : null}
                <input
                    type="file"
                    id="imgupload"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={this.fileSelectedHandler}
                />
            </React.Fragment>
        );
    }
}
