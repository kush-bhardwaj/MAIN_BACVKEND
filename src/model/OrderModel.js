require('../db/db')
const COLLECTION =require('../db/collection')
const mongoose = require('mongoose');
const{ ObjectId }= require('mongodb')
const ORD = "ORD";
function generateRandomString(prefix) {
    return prefix+Date.now() + '-' + Math.round(Math.random() * 1E9)
}

const OrderSchema = mongoose.Schema({
    userId: { type: ObjectId, required: [true, 'userId missing'] },
    orderId: { type: String, default:generateRandomString(ORD)},
    items: [{
        productId: {type:String ,required:[true,'product is must']},
        qty: {type :Number,required:[true,'qty missing']},
        unitPrice: {type:Number, required:[true,'price missing']},
    }],
    // totalDiscount: {type:Number},
    // paymentOption: {type:String},
    // paymentMedium: {type:String},
    // transactionId: {type:String},
    // isDelivered: {type:Boolean,default:false},
    // deliveryAddress: {type:String,required:[true,'add must ']},
})
const OrderModel = new mongoose.model(COLLECTION.order,OrderSchema)
module.exports = OrderModel;