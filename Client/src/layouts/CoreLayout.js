import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Nav} from '../common/components/Nav'; 
import HomeView from '../common/views/HomeView';


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
		actions: { }
});

export default class CoreLayout extends React.Component {
	render() {
		return (
		<div>
			{this.props.isLoggedIn ? 
			<div>
				<Nav/>
				<div className='viewContainer'>
				{this.props.children}
				</div>
			</div>)
			: 
			{HomeView}}

			<footer className='footer'>A gUrR Creation - v0.01 - 2016</footer>
		</div>
	}
}

CoreLayout.propTypes = {
	children : React.PropTypes.element
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
