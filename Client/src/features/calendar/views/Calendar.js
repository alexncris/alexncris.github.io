import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Input, Table, Panel, FormGroup, FormControl, ControlLabel, Modal, Checkbox} from 'react-bootstrap';
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

	_deleteEvent() {
		return e => {
			this.props.actions.deleteCalendarEvent();
			this.setState({
				showModal: false
			});
		}
	}

	render() {
		var calendarProps = this.props.calendar;
		var addEventReady = calendarProps.startDate && calendarProps.endDate && calendarProps.name;
		var events = calendarProps.events;	
	
		return <div>
			<div className='calendar'>
				<BigCalendar
				  popup
				  selectable
			      events={events}
			      onSelectEvent={(event => {
			      					this.props.actions.setEvent(event);
			      					this._openModal('view');
			      				})}
		          onSelectSlot={(slotInfo => {
					          		this.props.actions.changeEventDate(slotInfo);
					          		this._openModal('add');
					          	})}
			    />
			  	<br/>
			  	<span className='error'>{calendarProps.error}</span>
			  	<br/>
			</div>
			
			<Modal style={{height: 'fixed'}} show={this.state.showModal} onHide={this._closeModal()}>
				      <Modal.Header closeButton bsStyle='success'>
					      <Modal.Title>
					      	{<div className='flex'><span>{`${this.state.modalType === 'add' ? 'Add a New Event' : calendarProps.name}`}</span>{this.state.modalType !== 'add' ? <div style={{marginTop: '5px'}} className='flex'><span style={{marginLeft: '20px'}} className='pencil-icon'/><span style={{marginLeft: '10px'}} onClick={this._deleteEvent()} className='delete-icon'/></div> : false}<span style={{marginTop: '6px'}} className='subheading'>{this.state.wizardStage === 1 && this.state.modalType === 'add' ? 'When\'s the event happening' : this.state.wizardStage === 2 && this.state.modalType === 'add' ? 'Describe the event' : ''}</span></div>}
					      </Modal.Title>
				      </Modal.Header>

				      <Modal.Body>
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
								    <br/>
								    <Checkbox checked={calendarProps.startDate.date === calendarProps.endDate.date} disabled={true} readOnly>
								      All Day
								    </Checkbox>
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
						: 

							<form>
								    <FormGroup className='formControlsText'>
								      <ControlLabel>Description</ControlLabel>
								      <br/>
  								      <span>{calendarProps.description ? calendarProps.description : 'None'}</span>
								    </FormGroup>
								    {calendarProps.startDate.date === calendarProps.endDate.date ? 
								    	<FormGroup className='formControlsText'>
								    		<br/>
								      		<ControlLabel>All Day</ControlLabel>
								    	</FormGroup>
								    :
								    	<div>
									    	<FormGroup className='formControlsText'>
									    		<ControlLabel>Start Date/Time</ControlLabel>
									    		<br/>
									    		<span>{calendarProps.startDate.displayDate}</span>
									    	</FormGroup>
									    	<FormGroup className='formControlsText'>
									    		<ControlLabel>End Date/Time</ControlLabel>
									    		<br/>
									    		<span>{calendarProps.endDate.displayDate}</span>
									    	</FormGroup>
								    	</div>
								    }
								</form>
						}
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
		this.props.actions.getCalendarEvents();
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
