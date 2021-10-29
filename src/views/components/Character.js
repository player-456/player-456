import React from "react";

class Character extends React.Component {
  render() {
    return (
      <div className="character">
        <div className="character--image">
          <img src={this.props.img} alt={this.props.alt} role="presentation" />
        </div>

        <div className="character--info">
          <h4 className="character--name">
            {this.props.name}
          </h4>
          <p className="character-description">
            {this.props.desc}
          </p>
        </div>
      </div>
    )
  }
}

export default Character;