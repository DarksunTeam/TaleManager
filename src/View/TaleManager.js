import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { faFlag, faGlobeAmericas, faTheaterMasks, faCommentDots } from '@fortawesome/free-solid-svg-icons';

import './style.css'

import ElectronCustomization from './ElectronCustomization/ElectronCustomization';
import LateralBorder from './LateralBorder/LateralBorder';

import CampaignScreen from './Campaign/CampaignScreen';
import AboutScreen from './About/AboutScreen';

class TaleManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedScreen: 1,
      buttons: [
        { id: 1, icon: faFlag, text: "Campanha" },
        { id: 2, icon: faGlobeAmericas, text: "Cenário" },
        { id: 3, icon: faTheaterMasks, text: "Personagens" },
        { id: 4, icon: faCommentDots, text: "Sobre" }
      ]
    };
  }

  changeSelectedScreen = button => {
    this.setState({ selectedScreen: button.id });
  }

  ScreenSwitch() {
    switch (this.state.selectedScreen) {
      case 1:
        return <CampaignScreen />;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return <AboutScreen />;
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
        <div className="container-fluid background">
          <div className="row background">
            <LateralBorder selectedButton={this.state.selectedScreen} buttons={this.state.buttons} changeSelectedScreen={this.changeSelectedScreen} />
            {this.ScreenSwitch()}
          </div>
        </div>
      </div>
    );
  }
}

export default TaleManager;
