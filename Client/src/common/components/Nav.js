import React from 'react';
import {Link} from 'react-router';
import ROUTES from '../constants/menus'

export class Nav extends React.Component {
	render () {
		var path = document.location.pathname;
		return (
			<ul className='nav nav-tabs'>
			{	
				ROUTES.map((n) => 
					<li className={path===n.link ? 'active' : ''} key={n.key} 
						onClick={true ? false : n.onClick}>
						{n.active ? <Link to={n.link}>{n.name}</Link> : false}
					</li>
				)
			}

			</ul>
		);
	}
}