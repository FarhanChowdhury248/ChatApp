import React from 'react';
import './ParticipantCard.css';

export const ParticipantCard = (props) => {
	return (
		<div className="cardContainer">
			<div className="profilePicContainer"><img className="profilePic" src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg" alt="Profile"></img></div>
			<span className="usernameContainer">{props.username}</span>
		</div>
	);
}