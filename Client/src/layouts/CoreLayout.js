import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Nav} from '../common/components/Nav'; 
import LoginView from '../common/views/Login';
import HomeView from '../common/views/Home';
import {Button} from 'react-bootstrap';

const mapStateToProps = state => ({
  auth:state.auth
});

export default class CoreLayout extends React.Component {
	_capitalise(string) {
      return (string.replace(/^.|\s\S/g, function(a) { return a.toUpperCase(); }))
    }

	_logout() {
		return e => {
			localStorage.clear();
			document.location = '/';
		}
	}

	render() {
		var authState = this.props.auth;
		var isLoggedIn = authState.isLoggedIn;
		return (
		<div>
			{isLoggedIn ? 
			<div>
				<div>
					<div className='flex user'>
						<h3 className='username'>{this._capitalise(authState.user)}</h3>
						<Button className='logout' bsStyle='primary' onClick={this._logout()}>Logout</Button>
					</div>
					<Nav className='nav'/>
				</div>
				<div className='viewContainer'>
				{this.props.children ? this.props.children : <HomeView/>}
				</div>
			</div>
			: 
			<LoginView/>}

			<footer className='footer'>A gUrR Creation - v0.01 - 2016</footer>
		</div>)
	}
}

CoreLayout.propTypes = {
	children : React.PropTypes.element
}

export default connect(mapStateToProps)(CoreLayout);
