const express = require('express');

const routes = express.Router();

const devController = require('./Controllers/DevController');

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World' })
})

routes.post('/devs', devController.store)

routes.get('/devs', devController.index)

module.exports = routes;