import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth';

const isActive = (history, path) => {
	if(history.location.pathname === path) return {color: "#9acd32"}
		else return {color: "#ffffff"}
};

const Menu = ({history}) => (
	<div>
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
				  <li className="nav-item" style={isActive(history, "/")}>
				    <Link className="nav-link" to="/">Home</Link>
				  </li>
				  {!isAuthenticated() && (
				  	<>
						<li className="nav-item" style={isActive(history, "/signin")}>
					    	<Link className="nav-link" to="/signin">Sign In</Link>
					  	</li>
						<li className="nav-item" style={isActive(history, "/signup")}>
						  	<Link className="nav-link" to="/signup">Sign Up</Link>
						</li>
					</>
				  	)}
				</ul>
				<ul className="navbar-nav">
					{isAuthenticated() && (
						<>
						<li className="nav-item">
						  	<Link className="nav-link" to={`/user/${isAuthenticated().user._id}`}>{isAuthenticated().user.name}</Link>
						</li>

						<li className="nav-item">
					    	<Link onClick={() => signout(() => history.push("/"))} className="nav-link">Sign out</Link>
					  	</li>
					  	</>
					)}
				</ul>
			</div>
		</nav>
	</div>
);

export default withRouter(Menu); 

// <> React Fragments by wraping up multiple elements