import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Nav} from '../common/components/Nav'; 

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
		actions: { }
});

export default class CoreLayout extends React.Component {
	render() {
		return (
		<div>
			<Nav/>
			<div className='viewContainer'>
			{this.props.children}
			</div>

			<footer className='footer'>A gUrR Creation - v0.01 - 2016</footer>
		</div>)
	}
}

CoreLayout.propTypes = {
	children : React.PropTypes.element
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
