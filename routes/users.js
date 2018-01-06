const express = require('express');
const db = require('../src/database'); //G: Zugriff auf Datenbank
const User = require('../src/User'); //G: Zugriff auf User Konstruktor

const router = express.Router(); //G: Wichtig damit node bin/www läuft

let userCollection = db.getCollection('users');

router.get('/', getAllUsers);

function getAllUsers(request, response) {
	let userObjects = userCollection.find();
	response.json(userObjects);
}

router.get('/:userId', getSingleUser);

function getSingleUser(request, response) {
	let userId = request.params.userId;
	let userObject = userCollection.get(userId);
	response.json(userObject);
}

router.post('/', createUser);

function createUser(request, response) {
	let newUser = new User(request.body.name);
	userCollection.insert(newUser);
	response.json(newUser);
}

router.patch('/:userId', addCalendarToUser);

function addCalendarToUser(request, response) {
	let userId = request.params.userId;
	let calendarId = request.body.calendar;
	
	let userObject = userCollection.get(userId);
	let calendar = db.getCollection('calendar').get(calendarId);
	userObject.addCalendar(calendar);
	
	response.json(userObject);
}

module.exports = router; //G: Wichtig damit node bin/www läuft