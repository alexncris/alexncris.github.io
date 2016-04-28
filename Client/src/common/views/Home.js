import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Button, Panel, Table} from 'react-bootstrap';
import changesActions from '../../features/changes/actions/changes';
import moment from 'moment';

const mapStateToProps = (state) => ({
	changes: state.changes
});

const mapDispatchToProps = dispatch => ({
	actions : bindActionCreators(Object.assign({}, changesActions), dispatch)
});


class ChangeRow extends React.Component {
	_capitalise(string) {
      return (string.replace(/^.|\s\S/g, function(a) { return a.toUpperCase(); }))
    }

	render () {
		var change = this.props.changeItem;
		var time = moment(change.time).format('HH:mm DD-MM-YY');
 		return (
			<tr key={this.props.index}>	
				<td>{change.change}</td>
				<td>{this._capitalise(change.author)}</td>
				<td>{time}</td>
			</tr>
		);
	}
}

ChangeRow.propTypes = {
	changeItem: React.PropTypes.object,
	index: React.PropTypes.string
}

export default class Home extends React.Component {
	render() {
		var changeProps = this.props.changes;
		var changes = changeProps.displayList;
		return (
		<div>
		<Panel header="Recent Changes">
	        <Table striped hover>
				<thead>
			      <tr>
			        <th style={{width: '30%'}}>Change</th>
			        <th style={{width: '15%'}}>Made By</th>
			        <th style={{width: '20%'}}>Time</th>
			      </tr>
			    </thead>
			    <tbody className={changeProps.isGettingChanges ? 'collapsed' : ''}>
						{changes.map((value, index) => 
							<ChangeRow  changeItem={value} 
										key={index}/>
						)}
						{changeProps.length === 0 && !changeProps.isGettingChanges ? <tr><td colSpan='3'>No recent changes</td></tr> : false}
				</tbody>
			</Table>
	    </Panel>
		<Panel header='Notifications'>
	    </Panel>
		</div>)
	}

	componentWillMount() {
		this.props.actions.getChanges();
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
