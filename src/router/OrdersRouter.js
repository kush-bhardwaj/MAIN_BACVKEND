const OrderRouter = require('express').Router();
const { PlaceOrder } = require('../controlls/OrderController');

OrderRouter.post('/addorder',PlaceOrder)
module.exports = OrderRouter;
