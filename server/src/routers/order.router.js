/* eslint-disable linebreak-style */
const { Router } = require('express');

const express = require('express');

const orderRouter = express.Router();

const {
  orders,
  deleteOrder,
  updateCleaner,
  adminTab2Info,
  ordersCleanerPlanned,
  updatePrice,
  ordersCleanerAvailable,
  addOrder,
} = require('../controllers/order.controller');

module.exports = orderRouter
  .get('/', orders)
  .delete('/:id', deleteOrder)
  .put('/', updateCleaner)
  .get('/tab2', adminTab2Info)
  .get('/planned', ordersCleanerPlanned)
  .get('/available', ordersCleanerAvailable)
  .patch('/', updatePrice)
  .post('/addorder', addOrder)
