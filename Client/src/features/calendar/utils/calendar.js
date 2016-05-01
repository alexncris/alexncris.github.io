export function normaliseEvents (events) {
  var newEvents = [];
  events.map(event => {
  	var newEvent = {};
  	newEvent.title = event.name;
  	newEvent.description = event.description;
  	newEvent.allDay = event.startDate === event.endDate ? true : false;
  	newEvent.start = new Date(event.startDate);
  	newEvent.end = new Date(event.endDate);
  	newEvent.id = event.id;
  	newEvents.push(newEvent);
  });
  return newEvents;
}