import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
		actions: { }
});

export default class HomeView extends React.Component {
	_choosePerson(name) {
		return e => {
			window.appSettings.person = name;
		}
	}
	render() {
		return (
		<div>
			<h2 className='centre whoAreYou'>Who are you?</h2>
			<br/>
			<br/>
			<div className='centre choosePerson'>
				<div onClick={this._choosePerson('alex')} className ='chooseAlex'/>
				<div onClick={this._choosePerson('cris')} className ='chooseCris'/>
			</div>
			<br/>
			<Input placeholder='Password' type='password'/><Button bsStyle='success'>Continue</Button>
		</div>)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
