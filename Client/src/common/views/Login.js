import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Button} from 'react-bootstrap';
import authActions from '../auth/actions/auth';

const mapStateToProps = (state) => ({
	auth: state.auth
});

const mapDispatchToProps = dispatch => ({
	actions : bindActionCreators(Object.assign({}, authActions), dispatch)
});

export default class Login extends React.Component {
	_chooseUser(name) {
		return e => {
			this.props.actions.selectUser(name);
		}
	}

	_changePassword(e) {
		return e => {
			this.props.actions.changePassword(e);
		}
	}

	_login() {
		return e => {
			this.props.actions.login();
		}
	}

	_capitalise(string) {
    	return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
	}

	render() {
		var authState = this.props.auth;
		return (
		<div>
			<h2 className='centre whoAreYou'>Who are you?</h2>
			<br/>
			<br/>
			<div className='centre chooseUser'>
				<div className='flex'>
					<div onClick={this._chooseUser('alex')} className ='chooseAlex'/>
					<div onClick={this._chooseUser('cris')} className ='chooseCris'/>
				</div>
				{authState.user ? 
					<div>
						<div className='flex'>
							<label style={{marginRight: '10px', paddingTop: '6px'}}>{this._capitalise(authState.user)}</label>
							<Input onChange={this._changePassword()} placeholder='Password' type='password' value={authState.password}/><Button onClick={this._login()} className='continueBtn' bsStyle='success'>Continue</Button>
						</div>
						<label style={{color: 'red'}}>{authState.error}</label>
					</div>
				: 
					<div></div>
				}
			</div>
			<br/>
		</div>)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
