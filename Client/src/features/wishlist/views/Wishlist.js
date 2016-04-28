import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Input, Table} from 'react-bootstrap';
import getWishlistActions from '../actions/getWishlist';
import addWishlistItemActions from '../actions/addWishlistItem';

const mapStateToProps = (state) => ({
	getWishlist: state.getWishlist,
	addWishlistItem: state.addWishlistItem
});

const mapDispatchToProps = dispatch => ({
	actions : bindActionCreators(Object.assign({}, getWishlistActions,
			  addWishlistItemActions), dispatch)
});

class WishlistRow extends React.Component {
	_goToUrl(url) {
		return e => {
			window.open(url.indexOf('http://') > -1 ? url : `http://${url}`, '_blank');
		}
	}

	render () {
		var item = this.props.wishlistItem;
		var tableSplit = item.split; 
		var tableSplitStyle = tableSplit ? {borderTop: '2px solid darkgrey'} : {}; 
 		return (
			<tr key={this.props.index}>	
				<td style={tableSplitStyle}className={tableSplit ? 'tableSplit' : ''}>{item.name}</td>
				<td style={tableSplitStyle}><a className='link' onClick={this._goToUrl(item.url)}>{item.url}</a></td>
				<td style={tableSplitStyle}>{`£${item.cost.toFixed(2)}`}</td>
				<td style={tableSplitStyle}>
					<div style={{whiteSpace: 'nowrap'}}>
						<span className={item.priority ? 'fav-icon' : 'fav-empty-icon'}/>
						<span onClick={this.props.completeWishlistItemAction(item.id)} style={{marginLeft: '10px'}} className='completed-icon'/>
					</div>
				</td>

			</tr>
		);
	}
}

WishlistRow.propTypes = {
	wishlistItem: React.PropTypes.object,
	index: React.PropTypes.string
}

export default class Wishlist extends React.Component {
	_changePriority(e, priority) {
		return e => {
			this.props.actions.changePriority(priority);
		}
	}

	_completeWishlistItem(id) {
		return e => {
			this.props.actions.completeWishlistItem(id);
		}
	}
	
	render() {
		var getWishlistProps = this.props.getWishlist;
		var addWishlistItemProps = this.props.addWishlistItem;
		var ready = addWishlistItemProps.name && addWishlistItemProps.isValidUrl &&
					addWishlistItemProps.isValidCost;
		
		var totalCost = 0;
		getWishlistProps.displayList.map(item => {
			totalCost += parseFloat(item.cost);
		})

		return (
		<div>
			<div style={{marginTop:'20px', display:'flex', width: '80%'}}>
				<input onChange={this.props.actions.changeName} style={{width:'60%'}} type="text" className="form-control" placeholder='Name' value={addWishlistItemProps.name}/>
				<input onChange={this.props.actions.changeUrl} style={{width:'80%', marginLeft:'15px'}} className='form-control' value={addWishlistItemProps.url} placeholder='Link'/>
				<label className='pound'>£</label>
				<input onChange={this.props.actions.changeCost} style={{width:'25%', marginLeft:'5px'}} className='form-control' value={addWishlistItemProps.cost} placeholder='Cost'/>

				<div onClick={this._changePriority(this, addWishlistItemProps.priority ? false : true)}>
					<span style={{marginLeft:'15px', marginRight:'10px', marginTop: '8px'}}>Priority?</span>
					<input style={{marginTop: '12px'}} defaultChecked={addWishlistItemProps.priority} type='checkbox'/>
				</div>
				<Button disabled={!ready} onClick={this.props.actions.addWishlistItem} style={{marginLeft:'30px'}} bsStyle='success'>Add Item</Button>
			</div>
			<br/>
			<Table striped bordered hover style={{marginTop:'20px', width:'900%'}}>
				<thead>
			      <tr>
			        <th style={{width: '30%'}}>Name</th>
			        <th style={{width: '30%'}}>Link</th>
			        <th style={{width: '30%'}}>Cost</th>
			        <th></th>
			      </tr>
			    </thead>
			    <tbody className={getWishlistProps.isGettingWishlist || getWishlistProps.isCompletingWishlistItem ? 'collapsed':''}>
						{getWishlistProps.displayList.map((value, index) => 
							<WishlistRow wishlistItem={value} 
										 key={index}
										 completeWishlistItemAction={this._completeWishlistItem.bind(this)}/>
						)}
						{getWishlistProps.wishlist.length === 0 && !getWishlistProps.isGettingWishlist ? <tr><td colSpan='4'>Nothing on the wishlist to show</td></tr> : false}
						<tr>
							<td/>
							<td/>
							<td><b>{`£${totalCost}`}</b></td>
							<td/>
						</tr>
				</tbody>
			</Table>
		</div>)
	}

	componentWillMount() {
		this.props.actions.getWishlist();
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
