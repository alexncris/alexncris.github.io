import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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
			<span style={{marginLeft: '50px', marginRight: '20px'}}>Cat Tasks</span>
			<span style={{marginRight: '20px'}}>Shared Calendar</span>
			<span style={{marginRight: '20px'}}>ToDo</span>
			<span style={{marginRight: '20px'}}>IOUs</span>
			<span style={{marginRight: '20px'}}>Suggested Weekly Menus</span>
			<span style={{marginRight: '20px'}}>Wishlist</span>

		</div>)
	}
}

CoreLayout.propTypes = {
}
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
