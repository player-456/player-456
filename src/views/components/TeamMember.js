import React from "react";

class TeamMember extends React.Component {
  render() {
    return (
      <div className="team-member">
        <img src={this.props.img} alt={this.props.alt} role="presentation" />
        <p><a href={this.props.linkUrl} target="_blank" rel="noreferrer">{this.props.linkText}</a></p>
        <p>{this.props.title}</p>
      </div>
    )
  }
}

export default TeamMember;