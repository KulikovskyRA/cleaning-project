const express = require('express');

const serviceRouter = express.Router();

const {
  servicesAll,
  serviceEdit,
  serviceDelete,
} = require('../controllers/service.controller');

module.exports = serviceRouter
  .get('/all', servicesAll)
  .put('/:id', serviceEdit)
  .delete('/:id', serviceDelete);
