import React from '../../../node_modules/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Card from '../components/Card/Card'
import Character from '../../Model/Character'

class CharacterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            characters: [],
            changeSelectedScreen: props.changeSelectedScreen,
            fileController: props.fileController
        };
        this.search = this.search.bind(this);
        this.state.characters = this.state.fileController.getArray('Character');
    }

    handleButton = button => {
        button._id = 6;
        this.state.changeSelectedScreen(button);
    }

    search(event) {
        this.setState({ filter: event.target.value });
    }

    render() {
        const btnNewCharacter = { _id: 6, card: new Character() };
        return (
            <div className="col">
                <div className="row search">
                    <input type="text" className="searchBar" placeholder="Pesquisar" value={this.state.filter} onChange={this.search} />
                    <button className="btn btn-info" id="searchButton" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                </div>
                <div className="row screen-title">
                    <div className="col">
                        <h2>Personagens</h2>
                    </div>
                </div>
                <div className="row">
                    {this.state.characters.filter(character => character.name.toUpperCase().includes(this.state.filter.toUpperCase())).map(character => (
                        <Card key={character._id} object={Object.assign(new Character(), character).convertToCard()} onClick={this.handleButton} />
                    ))}
                </div>
                <div>
                    <FontAwesomeIcon icon={faPlusCircle} onClick={() => this.handleButton(btnNewCharacter)} />
                </div>
            </div>
        );
    }
}

export default CharacterScreen;
