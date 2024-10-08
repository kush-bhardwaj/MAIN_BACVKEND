const OrderRouter = require('express').Router();
const { PlaceOrder } = require('../controlls/OrderController');
const { customerMiddleWare } = require('../middleware/CustomerMiddleware');
OrderRouter.use(customerMiddleWare)
OrderRouter.post('/addorder',PlaceOrder)
module.exports = OrderRouter;
