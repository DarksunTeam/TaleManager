import React from '../../../node_modules/react';

import './AboutScreen.css'

class AboutScreen extends React.Component {

    render() {
        let appIcon = "/img/TaleManager.png";
        if (window && window.process && window.process.type) {
            const ipcRenderer = window.require("electron").ipcRenderer;
            appIcon = ipcRenderer.sendSync("isDev") ? "/img/TaleManagerHomologacao.png" : "/img/TaleManager.png";
        }
        return (
            <div className="col">
                <img id="centerIcon" alt="" src={appIcon}></img>
                <div >
                    <h1>Tale Manager</h1>
                    <h6>Criador: Marcos "Coppola" Gonçalves(Coppolaop)</h6>
                    <h6>Repositório: github.com/DarksunTeam/TaleManager</h6>
                    <h6><br />Desenvolvedores:</h6>
                    <h6>Marcos "Coppola" Gonçalves (coppolaop)</h6>
                    <h6>Vitor Abel (vitor-abel)</h6>
                </div>
                <div className="version">
                    <h6>Versão 1.0.0</h6>
                </div>
            </div>
        );
    }
}

export default AboutScreen;