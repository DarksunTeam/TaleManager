import React from '../../../node_modules/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Character from '../../Model/Character';

import './CharacterForm.css'


class CharacterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileController: props.fileController,
            character: props.fileController.get('Character', props.selectedCard._id)
        };
        if (this.state.character != null) {
            this.baseState = JSON.parse(JSON.stringify(this.state.character));
        } else {
            this.state.character = new Character(this.state.fileController.getNewId('Character'), '', '', '', '', '', '', '', '', '', '');
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

        let character = this.state.character;
        character[name] = value;

        if (name === 'name') {
            character.fileName = character.name.normalize("NFD").replace(/[^\d\w]/g, "") + '.json';
        }

        this.setState({
            character: character
        });
    }

    handleTagInputChange(type, itens) {
        let character = this.state.character;
        character[type] = itens;
        this.setState({
            character: character
        });
    }

    handleSubmit() {
        if (this.baseState != null) {
            this.state.fileController.removeObject('Character', this.baseState.fileName);
        }
        this.state.fileController.setObject('Character', this.state.character);
    }

    handleReset(event) {
        this.setState({ character: JSON.parse(JSON.stringify(this.baseState)) });
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
                this.state.fileController.removeObject('Character', this.baseState.fileName);
            }
            this.state.fileController.removeObject('Character', this.state.character.fileName);
        } else {
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="col">
                <form onKeyPress={(e) => { e.key === 'Enter' && e.target.type !== 'textarea' && e.preventDefault(); }}>
                    <div className="form-group">
                        <label className="col-6">
                            Nome:<br />
                            <input type="text" name="name" value={this.state.character.name} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                            Familia:<br />
                            <input type="text" name="family" value={this.state.character.family} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                            Raça:<br />
                            <input type="text" name="race" value={this.state.character.race} onChange={this.handleInputChange}></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="col-4">
                            Sexo:<br />
                            <input type="text" name="sex" value={this.state.character.sex} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-4">
                            Data de Nascimento:<br />
                            <input type="text" name="bornDate" value={this.state.character.bornDate} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-4">
                            Data da Morte:<br />
                            <input type="text" name="dieDate" value={this.state.character.dieDate} onChange={this.handleInputChange}></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="col-12">
                            Características físicas:<br />
                            <input type="text" name="physicalCharacteristics" value={this.state.character.physicalCharacteristics} onChange={this.handleInputChange}></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="col-12">
                            Background:<br />
                            <textarea type="text" name="background" id="CammpaignFormBackground" value={this.state.character.background} onChange={this.handleInputChange}></textarea >
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="col-12">
                            Interpretação do Personagem:<br />
                            <textarea type="text" name="interpretationTips" id="CammpaignFormInterpretationTips" value={this.state.character.interpretationTips} onChange={this.handleInputChange}></textarea >
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

export default CharacterForm;
