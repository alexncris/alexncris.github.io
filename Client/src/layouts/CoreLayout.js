import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Nav} from '../common/components/Nav'; 
import LoginView from '../common/views/Login';
import HomeView from '../common/views/Home';

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

	_goToUrl(url) {
		return e => {
			this.props.history.pushState(null, url);
		}
	}

	render() {
		var authState = this.props.auth;
		var isLoggedIn = authState.isLoggedIn;
		return (
		<div>
			{isLoggedIn ? 
			<div>
				<div className='header'>
					<div className='flex user'>
						<h4 className='username'>{this._capitalise(authState.user)}</h4>
						<span className='logout-icon logout' onClick={this._logout()}/>
					</div>
					<Nav urlAction={this._goToUrl.bind(this)}/>
				</div>
				<div className='viewContainer'>
					{this.props.children ? this.props.children : <HomeView/>}
				</div>
			</div>
			: 
			<LoginView/>}
		</div>)
	}
}

CoreLayout.propTypes = {
	children : React.PropTypes.element
}

export default connect(mapStateToProps)(CoreLayout);
