import React from '../../../node_modules/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Card from '../components/Card/Card'

class CampaignScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            campaigns: [
                { _id: 1, title: "Conferência de Arvorezes", subtitles: ["Pathfinder"], description: "Campanha principal do cenário" },
                { _id: 2, title: "Henzo20", subtitles: ["Tormenta20"], description: "Mesa ForFun" },
                { _id: 3, title: "Groslieu", subtitles: ["Pathfinder2e"], description: "Campanha no continente de Groslieu" },
                { _id: 4, title: "Heroes of Prime", subtitles: ["Mutants&Masterminds"], description: "Campanha de super heróis de Prime" },
            ],
        };
        this.search = this.search.bind(this);
    }

    openForm(_id) {

    }

    search(event) {
        this.setState({ filter: event.target.value });
    }

    render() {
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
                    {this.state.campaigns.filter(campaign => campaign.title.toUpperCase().includes(this.state.filter.toUpperCase())).map(campaign => (
                        <Card key={campaign._id} object={campaign} />
                    ))}
                </div>
                <div>
                    <FontAwesomeIcon icon={faPlusCircle} onClick={() => this.openForm()} />
                </div>
            </div>
        );
    }
}

export default CampaignScreen;
