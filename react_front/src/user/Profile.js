import React, { Component } from 'react';
import {isAuthenticated} from '../auth';

class Profile extends Component {

	constructor() {
		super();
		this.state = {
			user: "",
			redirectToSignin: false
		}
	}

	componentDidMount() {
		console.log("user id from param:", 
		this.props.match.params.userid);
		const userid = this.props.match.params.userid;
		fetch(`http://localhost:8080/user/${userid}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${isAuthenticated().token}`
			}
	}).then(data => {
		if(data.error) {
			console.log("ERROR");
		} else {
			console.log(data);
		}
	});
}

	render() {
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Profile</h2>
				<p>Hello {isAuthenticated().user.name}</p>
			</div>
		);
	}
}

export default Profile;
