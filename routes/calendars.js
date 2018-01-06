const express = require('express');
const Request = require('request');
const db = require('../src/database');
const Calendar = require('../src/Calendar');

const router = express.Router();

let calendarCollection = db.getCollection('calendars');

router.get('/', getAllCalendars);

function getAllCalendars(request, response) {
	let calendars = calendarCollection.find();
	response.json(calendars);
}

router.get('/:calendarId', getSingleCalendar);

function getSingleCalendar(request, response) {
	let calendarId = request.params.calendarId;
	let calendar = calendarCollection.get(calendarId);
	response.json(calendar);
}

router.post('/', createCalendar);

function createCalendar(request, response) {
	let userCollection = db.getCollection('users');
	let user = userCollection.get(request.body.owner);
	
	let newCalendar = new Calendar(request.body.name, user);
	calendarCollection.insert(newCalendar);
	
	//Pipapo Antwort und mögliche Fehler ignorieren
	Request.patch({
		url: 'http://localhost:3000/users/' + user.$loki,
		json: { calendar: newCalendar.$loki }
	});
	
	response.json(newCalendar);
}

module.exports = router;