// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Función auxiliar para verificar si una fecha es inválida.
// Convierte la fecha en formato UTC y compara con "Invalid Date".
const isInvalideDate = (date) => date.toUTCString() === "Invalid Date"

// your first API endpoint... 
// Define el primer endpoint de la API para manejar solicitudes a "/api/:date".
app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date) // Intenta crear un objeto Date usando el parámetro recibido.
  if(isInvalideDate(date)){ // Si la fecha es inválida, intenta interpretar el parámetro como un número (marca de tiempo UNIX).
    date = new Date(+req.params.date)
  }
  if(isInvalideDate(date)){ // Si aún es inválida después de ambos intentos, responde con un error.
    res.json({error: "Invalid Date"})
    return;  // Termina la ejecución para evitar enviar múltiples respuestas.
  }
   // Si la fecha es válida, responde con los formatos UNIX y UTC.
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

// Endpoint secundario para devolver la fecha actual
app.get("/api", (req, res) => {
  // Obtiene la fecha actual y la convierte a ambos formatos.
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()})
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
