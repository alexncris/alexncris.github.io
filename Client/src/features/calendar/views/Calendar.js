import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Input, Table, Panel, FormGroup, FormControl, ControlLabel, Modal} from 'react-bootstrap';
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
	constructor() {
	  super();
	  this.state = {
		showModal: false
	  }
	}

	_openModal(modalType) {
		this.setState({
		  modalType: modalType,
		  wizardStage: 1,
		  showModal: true
		});
	}

	_closeModal() {
	  	return e => {
			this.setState({
				showModal: false
			});
			this.props.actions.clearModalState();
		}
	}

	_changeWizardState(stage) {
		return e => {
			this.setState({
				wizardStage: stage
			});
		}
	}

	_addEvent() {
		return e => {
			this.props.actions.addCalendarEvent();
			this.setState({
				showModal: false
			});
		}
	}

	render() {
		var calendarProps = this.props.calendar;
		var addEventReady = calendarProps.startDate && calendarProps.endDate && calendarProps.name;

		return <div>
			<div className='calendar'>
				<BigCalendar
				  selectable
			      events={[]}
			      startAccessor='startDate'
			      endAccessor='endDate'
			      onSelectEvent={(event => console.log(event))}
		          onSelectSlot=
					          {(slotInfo => {
					          	this.props.actions.changeEventDate(slotInfo);
					          	this._openModal('add');
					          })}
			    />
			  	<br/>
			  	<br/>
			</div>
			
			<Modal style={{height: 'fixed'}} show={this.state.showModal} onHide={this._closeModal()}>
				      <Modal.Header closeButton bsStyle='success'>
					      <Modal.Title>
					      	{<div><span>{`${this.state.modalType === 'add' ? 'Add a New Event' : 'Event'}`}</span><span className='subheading'>{this.state.wizardStage === 1 ? 'When\'s the event happening' : 'Describe the event'}</span></div>}
					      </Modal.Title>
				      </Modal.Header>

				      <Modal.Body style={{height:'200px'}}>
				      	{this.state.modalType === 'add' ? 
				      		this.state.wizardStage === 1 ? 
						      	<form>
									<FormGroup controlId="formControlsText">
								      <ControlLabel>Start Date/Time</ControlLabel>
								      <FormControl type="text" disabled={true} value={calendarProps.startDate.displayDate}/>
								    </FormGroup>
								    <br/>
								    <FormGroup controlId="formControlsText">
								      <ControlLabel>End Date/Time</ControlLabel>
								      <FormControl type="text" disabled={true} value={calendarProps.endDate.displayDate}/>
								    </FormGroup>
								</form>
							:
								<form>
									<FormGroup controlId="formControlsText">
								      <ControlLabel>Name</ControlLabel>
								      <FormControl type="text" onChange={this.props.actions.changeEventName} value={calendarProps.name}/>
								    </FormGroup>
								    <FormGroup className='eventTextArea' controlId="formControlsTextarea">
								      <ControlLabel>Description</ControlLabel>
								      <FormControl componentClass="textarea" onChange={this.props.actions.changeEventDescription} value={calendarProps.description}/>
								    </FormGroup>
								</form>
						: false}
				      </Modal.Body>

				      <Modal.Footer>
				      	  <div style={{float: 'right'}} className='flex'>
					      <Button onClick={this._closeModal()}>{this.state.modalType === 'add' ? 'Cancel' : 'Close'}</Button>
					      {this.state.modalType === 'add' ?
					      	this.state.wizardStage === 1 ?
					      		<Button onClick={this._changeWizardState(2)}>Next</Button>
					      	:
					      		<div className='flex'>
					      			<Button style={{marginLeft: '5px'}} onClick={this._changeWizardState(1)}>Back</Button>
					      			<Button bsStyle='success' disabled={!addEventReady} onClick={this._addEvent()}>Create</Button>
					      		</div>
					      : false}
					    </div>
				      </Modal.Footer>
			      </Modal>


		</div>
	}

	componentWillMount() {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
