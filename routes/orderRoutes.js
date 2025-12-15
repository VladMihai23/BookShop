const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const isAdmin = require('../middleware/isAdmin');


router.get('/checkout', OrderController.checkoutPage);
router.post('/checkout', OrderController.checkout);


router.get('/order-success/:id', OrderController.orderSuccess);


router.get('/my-orders', OrderController.myOrders);


router.get('/admin/orders', isAdmin, OrderController.adminOrders);


router.get('/my-orders', OrderController.myOrders);
router.get('/my-orders/:id', OrderController.orderDetails);


module.exports = router;
