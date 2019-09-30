import React, { Component } from 'react';
import {signup} from '../auth';

// Validation Remaining from backend or do it in frontend....

class Signup extends Component {

	constructor() {
		super();
		this.state = {
			name: "",
			email: "",
			password: "",
			error: "",
			open: false
		}
	}

	handleChange = name => event => {
		this.setState({[name]: event.target.value});
	}

	clickSubmit = event => {
		event.preventDefault();
		const {name, email, password} = this.state;
		const user = {
			name,
			email,
			password
		};

		// console.log(user);
		signup(user).then(data => {
			if(data.error) this.setState({error: data.error});
			else this.setState({
				name: "",
				email: "",
				password: "",
				error: "",
				open: true
			});
			
		});
	};

	render() {
		const {name, email, password, open} = this.state;
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Signup</h2>

				{/*<div className="alert alert-danger" style={{display: error ? "" : "none"}}>
					{error}
				</div>*/}

				<div className="alert alert-info" style={{display: open ? "" : "none"}}>
					Account Created Successfully! Please Sign in to continue...
				</div>

				<form>
					<div className="form-group">
						<label className="text-muted">Name:</label>
						<input onChange={this.handleChange("name")} type="text" className="form-control" value={name} required/>
					</div>
					<div className="form-group">
						<label className="text-muted">Email:</label>
						<input onChange={this.handleChange("email")} type="email" className="form-control" value={email} required/>
					</div>
					<div className="form-group">
						<label className="text-muted">Password:</label>
						<input onChange={this.handleChange("password")} type="password" className="form-control" value={password} required/>
					</div>
					<button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
				</form>
			</div>
		);
	}
}

export default Signup;



