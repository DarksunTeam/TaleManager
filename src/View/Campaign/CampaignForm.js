import React from '../../../node_modules/react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Campaign from '../../Model/Campaign';

import './CampaignForm.css'


class CampaignForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileController: props.fileController,
            campaign: props.fileController.get('Campaign', props.selectedCard._id)
        };
        if (this.state.campaign != null) {
            this.baseState = JSON.parse(JSON.stringify(this.state.campaign));
        } else {
            this.state.campaign = new Campaign(this.state.fileController.getNewId('Campaign'), '', [], '', '', [], '');
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let campaign = this.state.campaign;
        campaign[name] = value;

        if (name === 'name') {
            campaign.fileName = campaign.name.normalize("NFD").replace(/[^\d\w]/g, "") + '.json';
        }

        this.setState({
            campaign: campaign
        });
    }

    handleTagInputChange(type, itens) {
        let campaign = this.state.campaign;
        campaign[type] = itens;
        this.setState({
            campaign: campaign
        });
    }

    handleSubmit() {
        if (this.baseState != null) {
            this.state.fileController.removeObject('Campaign', this.baseState.fileName);
        }
        this.state.fileController.setObject('Campaign', this.state.campaign);
    }

    handleReset(event) {
        this.setState({ campaign: JSON.parse(JSON.stringify(this.baseState)) });
        event.preventDefault();
    }

    handleDelete(event) {
        let confirmed = true;
        if (window && window.process && window.process.type) {
            const ipcRenderer = window.require("electron").ipcRenderer;
            confirmed = ipcRenderer.sendSync("dialog");
        }
        if (confirmed) {
            if (this.baseState != null) {
                this.state.fileController.removeObject('Campaign', this.baseState.fileName);
            }
            this.state.fileController.removeObject('Campaign', this.state.campaign.fileName);
        } else {
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="col">
                <form onKeyPress={(e) => { e.key === 'Enter' && e.target.type !== 'textarea' && e.preventDefault(); }}>
                    <div className="form-group">
                        <label className="col-12">
                            Nome:<br />
                            <input type="text" name="name" value={this.state.campaign.name} onChange={this.handleInputChange}></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="col-12">
                            Descrição:<br />
                            <textarea type="text" name="description" id="CammpaignFormDescription" value={this.state.campaign.description} onChange={this.handleInputChange}></textarea >
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="col-7">
                            Protagonistas:<br />
                            <TagsInput
                                value={this.state.campaign.protagonists}
                                onChange={this.handleTagInputChange.bind(this, 'protagonists')}
                                inputProps={{
                                    className: 'react-tagsinput-input',
                                    placeholder: 'Adicionar'
                                }}
                            />
                        </label>
                        <label className="col-5">
                            Data em que se passa:<br />
                            <input type="text" name="date" value={this.state.campaign.date} onChange={this.handleInputChange}></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="col-12">
                            Se passa em:<br />
                            <TagsInput
                                value={this.state.campaign.setIn}
                                onChange={this.handleTagInputChange.bind(this, 'setIn')}
                                inputProps={{
                                    className: 'react-tagsinput-input',
                                    placeholder: 'Adicionar'
                                }}
                            />
                        </label>
                    </div>
                    <button className="btn btn-info" onClick={this.handleReset}>Desfazer</button>
                    <button className="btn btn-info" onClick={this.handleSubmit}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleDelete}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </form>
            </div>
        );
    }
}

export default CampaignForm;
