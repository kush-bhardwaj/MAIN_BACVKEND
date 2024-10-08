const OrderModel = require('../model/OrderModel');
const CartModel = require('../model/CartModel')
const {ObjectId} = require ('mongodb')
exports.PlaceOrder = async(req, res ,next)=>{
    try{

        // const getInfo = await CartModel.find({userId:req.user_id})
        // console.log(req.user_id)
       
            const JoinData = await CartModel.aggregate([
                {$match:{userId:new ObjectId(req.user_id)}},
                {$lookup:{
                    from:'products',
                    localField:'productId',
                    foreignField:"_id",
                    as:"data",
                }},
                {
                    $unwind:"$data"
                }
            ])
            
            if(JoinData){
                // console.log("jjj",JoinData.length)
                if(JoinData.length !==0){
                    const item = [];
                    for(let x of JoinData)
                        {
                            const obj = {};
                            obj.productId = x.productId;
                            obj.qty = x.quantity,
                            obj.unitPrice = x.data.productPrice;
                            item.push(obj);
                        }
        
                        const details ={
                            userId:new ObjectId(req.user_id),
                            items:item,
                        }
                    //    console.log(details);
                       const AddOrder = await OrderModel.create(details);
                       if(AddOrder){
                            res.json({
                                status:"sucess",
                                message:"Order Placed"
                            })
                       }
                }
               else{
                res.json({
                    status:"success",
                    message:"Empty cart"
                })
               }
                
            }else{
                res.json({
                    status:"failed",
                    message:"fail to load"
                })
            }
       
    }catch(err){
        res.json({
            status:"failed",
            message:"Something went wrong",
            error:err
        })
    }
}