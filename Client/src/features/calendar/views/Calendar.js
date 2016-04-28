import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Input, Table, Panel} from 'react-bootstrap';
import calendarActions from '../actions/calendar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.momentLocalizer(moment)

const mapStateToProps = (state) => ({
	calendar: state.calendar,
});

const mapDispatchToProps = dispatch => ({
	actions : bindActionCreators(Object.assign({}, calendarActions), dispatch)
});

export default class Calendar extends React.Component {
	
	render() {
		var calendarProps = this.props.calendar;
		calendarProps = {mode: 'NONE'}
		return <div>
			<div className='calendar'>
				<BigCalendar
			      events={[]}
			      startAccessor='startDate'
			      endAccessor='endDate'
			    />
			  	<br/>
			  	<br/>
			</div>
			{calendarProps.mode !== 'NONE' ? 
				<Panel header={calendarProps.mode === 'NEW' ? 'New Event' : calendarProps.mode === 'SELECTED' ? 'Selected Event' : false}></Panel>
			: false}
		</div>
	}

	componentWillMount() {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
