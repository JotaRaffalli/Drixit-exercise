/**
 * Drixit exercise
 *  @description This file contains server side related logic of the exercise.
 *  It lifts server, configure express app and sets routes.
 */

// Imports
const express = require('express');
const http = require('http');
const cors = require('cors');
const schema  = require('./schema');
const dotenv = require('dotenv');
const path = require('path');

// Module to recognize .env files for custom variables
dotenv.config();

// Bootstraps express and sets port
const app = express()
const { PORT = 4000 } = process.env

// Enables Cors
app.use(cors())

// Creates http server
app.server = http.createServer(app);

/**
 *  API endpoint
 *  Configures endpoint to respond with statistics data.
    Schema will return data depending on .env mode.
 *  @return {array} data 
 */
app.get('/statistics', async (req, res) => { 
    const data = await schema(); 
    res.json(data);
  });

// Configures frontend build assets and resolves with index.html that react creates
app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// Lifts the server up and uses specified port or 4000 as default
app.server.listen(PORT, () => console.log(`Servidor API levantado en el puerto ${app.server.address().port}`))