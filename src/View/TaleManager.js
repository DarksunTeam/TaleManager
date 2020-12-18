import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { faFlag, faGlobeAmericas, faTheaterMasks, faCommentDots } from '@fortawesome/free-solid-svg-icons';

import './style.css'

import ElectronCustomization from './ElectronCustomization/ElectronCustomization';
import LateralBorder from './LateralBorder/LateralBorder';

import CampaignScreen from './Campaign/CampaignScreen';
import CharacterScreen from './Character/CharacterScreen';
import AboutScreen from './About/AboutScreen';
import CampaignForm from './Campaign/CampaignForm';
import CharacterForm from './Character/CharacterForm';

import FileController from '../Controller/FileController';

class TaleManager extends React.Component {

  constructor(props) {
    super(props);
    const initialScreen = Number(window.localStorage.getItem('selectedScreen') || 1);
    this.state = {
      selectedScreen: initialScreen,
      selectedCard: null,
      fileController: new FileController(),
      buttons: [
        { _id: 1, icon: faFlag, text: "Campanha", card: null },
        { _id: 2, icon: faGlobeAmericas, text: "Cenário", card: null },
        { _id: 3, icon: faTheaterMasks, text: "Personagens", card: null },
        { _id: 4, icon: faCommentDots, text: "Sobre", card: null }
      ]
    };
  }

  changeSelectedScreen = button => {
    if (this.state.buttons.forEach(btn => {
      if (btn._id === button._id) {
        window.localStorage.setItem('selectedScreen', button._id)
      }
    }));
    this.setState({ selectedCard: button.card });
    this.setState({ selectedScreen: button._id });
  }

  ScreenSwitch() {
    // eslint-disable-next-line
    this.state.fileController = new FileController();
    switch (this.state.selectedScreen) {
      case 1:
        return <CampaignScreen changeSelectedScreen={this.changeSelectedScreen} fileController={this.state.fileController} />;
      case 2:
        return 2;
      case 3:
        return <CharacterScreen changeSelectedScreen={this.changeSelectedScreen} fileController={this.state.fileController} />;
      case 4:
        return <AboutScreen />;
      case 5:
        return <CampaignForm changeSelectedScreen={this.changeSelectedScreen} selectedCard={this.state.selectedCard} fileController={this.state.fileController} />
      case 6:
        return <CharacterForm changeSelectedScreen={this.changeSelectedScreen} selectedCard={this.state.selectedCard} fileController={this.state.fileController} />
      default:
        return null;
    }
  }

  render() {
    return (
      <div id="content">
        <header>
          <ElectronCustomization />
        </header>
        <div className="container-fluid">
          <div className="row">
            <LateralBorder selectedButton={this.state.selectedScreen} buttons={this.state.buttons} changeSelectedScreen={this.changeSelectedScreen} />
            <div id="workspace">
              {this.ScreenSwitch()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaleManager;
