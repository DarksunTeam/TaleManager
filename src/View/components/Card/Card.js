import React from 'react';

import './Card.css'

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props._id,
      object: props.object
    }
  }

  render() {
    return (
      <div className="col-3" style={{ padding: 0 }}>
        <li className="card-item">
          <div className="card-info">
            <strong>{this.state.object.title}</strong>
            <span>{this.state.object.subtitles.join(', ')}</span>
          </div>
          <p>{this.state.object.description}</p>
          <button className="btn btn-info btn-card">Visualizar</button>
        </li>
      </div>
    );
  }
}

export default Card;