import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
		actions: { }
});

export default class CoreLayout extends React.Component {
	render() {
		return (
		<div>
			<b><p style={{marginLeft: '50px', marginTop: '50px', fontSize:'30px'}}>Alex n Cris' Web App</p></b>
			<br/>
			<span style={{marginLeft: '50px', marginRight: '10px'}}>Cat Tasks</span>
			<span style={{marginRight: '10px'}}>Shared Calendar</span>
			<span style={{marginRight: '10px'}}>ToDo</span>
			<span style={{marginRight: '10px'}}>IOUs</span>
			<span style={{marginRight: '10px'}}>Suggested Weekly Menus</span>
		</div>)
	}
}

CoreLayout.propTypes = {
}
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
