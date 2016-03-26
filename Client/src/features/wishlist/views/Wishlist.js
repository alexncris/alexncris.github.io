import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Input, Table} from 'react-bootstrap';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
		actions: {}
});

export default class Wishlist extends React.Component {
	_addWishlistItem() {

	}

	render() {
		return (
		<div>
			<div style={{marginTop:'20px', display:'flex'}}>
				<input style={{width:'30%'}} type="text" className="form-control" placeholder='Name'/><input style={{width:'30%', marginLeft:'15px'}} className='form-control' placeholder='Link'/>
				<Button style={{marginLeft:'15px'}} bsStyle='success'>Add Item</Button>
			</div>
			<Table striped bordered hover style={{marginTop:'20px', width:'50%'}}>
			<thead>
		      <tr>
		        <th>Name</th>
		        <th>Link</th>
		      </tr>
		    </thead>
			</Table>
		</div>)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
