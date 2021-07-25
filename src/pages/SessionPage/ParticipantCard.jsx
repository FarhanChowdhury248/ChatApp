import React from 'react';
import './ParticipantCard.css';

export const ParticipantCard = (props) => {
	return (
		<div className="cardContainer">
			<div className="profilePicContainer"><img className="profilePic" src="../../assets/images/profilePic.png" alt="Profile"></img></div>
			<span className="usernameContainer">{props.username}</span>
		</div>
	);
}