const OrderModel = require('../model/OrderModel');
exports.PlaceOrder = async(req, res ,next)=>{
    const OrderDetails ={
        userId:req.body.userid,
        items:req.body.items,
        paymentOption: req.body.paymentOption,
        paymentMedium: req.body.paymentMedium,
        transactionId: req.body.transactionId,
        deliveryAddress:req.body.deliveryAddress
    }
    console.log(OrderDetails)
    res.json({
        data:OrderDetails
    })
}