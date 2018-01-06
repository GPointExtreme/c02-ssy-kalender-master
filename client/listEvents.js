const Request = require('request');
const hostUrl = "http://localhost:3000";

// Wir holen uns den Namen von der Kommandozeile
let user = '';
if (process.argv.length < 3) {
    console.log("Starten Sie das Programm als 'npm run listEvents <Personen-Name>'");
    // wir nehmen code=0, weil sonst die lange npm-Fehlermeldung zu Verwirrung führen könnte
    process.exit(0);
} else {
    user = process.argv[2];
}

// Hilfsfunktion zum Sortieren nach Uhrzeit
function compareEventTime(ev1, ev2) {
    let time1 = Date.parse(ev1.startTime);
    let time2 = Date.parse(ev2.startTime);
    return (time1 - time2);
}
