import React from '../../../node_modules/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Card from '../components/Card/Card'
import Campaign from '../../Model/Campaign'

class CampaignScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            campaigns: [],
            changeSelectedScreen: props.changeSelectedScreen,
            fileController: props.fileController
        };
        this.search = this.search.bind(this);
        this.state.campaigns = this.state.fileController.getArray('Campaign');
    }

    handleButton = button => {
        button._id = 5;
        this.state.changeSelectedScreen(button);
    }

    search(event) {
        this.setState({ filter: event.target.value });
    }

    render() {
        const btnNewCampaign = { _id: 5, card: new Campaign() };
        return (
            <div className="col">
                <div className="row">
                    <input type="text" className="searchBar" placeholder="Pesquisar" value={this.state.filter} onChange={this.search} />
                    <button className="btn btn-info" id="searchButton" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                </div>
                <div className="row">
                    <div className="col">
                        <h2>Campanha</h2>
                    </div>
                </div>
                <div className="row">
                    {this.state.campaigns.filter(campaign => campaign.name.toUpperCase().includes(this.state.filter.toUpperCase())).map(campaign => (
                        <Card key={campaign._id} object={Object.assign(new Campaign(), campaign).convertToCard()} onClick={this.handleButton} />
                    ))}
                </div>
                <div>
                    <FontAwesomeIcon icon={faPlusCircle} onClick={() => this.handleButton(btnNewCampaign)} />
                </div>
            </div>
        );
    }
}

export default CampaignScreen;
