import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
		actions: { }
});

export default class Wishlist extends React.Component {
	render() {
		return (
		<div>
		</div>)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
