const express = require('express');
const db = require('../src/database');
const Event = require('../src/Event');

const router = express.Router();

let eventCollection = db.getCollection('events');

router.get('/', getAllEvents);

function getAllEvents(request, response) {
	let events = eventCollection.find();
	response.json(events);
}

router.get('/:eventId', getSingleEvent);

function getSingleEvent(request, response) {
	let eventId = request.params.eventId;
	let event = eventCollection.get(eventId);
	response.json(event);
}

router.post('/', createEvent);

function createEvent(request, response) {
	let userCollection = db.getCollection('users');
	let calendarCollection = db.getCollection('calendars');
	
	let calendar = calendarCollection.get(request.body.calendar);
	let participants = [];
	for (let user of request.body.participants) {
		participants.push(userCollection.get(user));
	}
	let event = new Event(calendar, request.body.name, request.body.place, request.body.startTime, participants);
	eventCollection.insert(event);
	
	response.json(event);
}

module.exports = router;