import React from 'react';
import {Link} from 'react-router';
import ROUTES from '../constants/menus'
import {ButtonGroup} from 'react-bootstrap';

export class Nav extends React.Component {
	render () {
		var path = document.location.hash;
		path = path.substring(2, path.length);
		if(path.length === 0) {path = '/'}
			
		return (
			<ButtonGroup className='navbar flex'>
			{	
				ROUTES.map((n, index) => {
					return n.active ? 
						<span style={{marginRight: '15px'}} key={index} onClick={this.props.urlAction(n.link)} className={`${n.icon} ${path === n.link ? 'active-icon' : ''}`}/>
					: false
				})
			}
			</ButtonGroup>
		);
	}
}