import Order from '../models/orderModel.js'
import asyncHandler from "express-async-handler";

//funciones para crear nuevas ordenes
//@routes POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice, totalPrice} = req.body;

    if (orderItems && orderItems.length ===0) {
        res.status(400)
        throw new Error('No hay productos en su orden')
        return
    }else{
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save();

        res.status(201).json(createdOrder)
    }
})

//funciones para ontener las ordenes por ID
//@routes GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async(req,res)=>{
    
    const order= await Order.findById(req.params.id).populate('user','name email')

    if (order) {
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Orden de compra no encontrada')
    }
})

//funciones actualiza las ordenes a pagar
//@routes PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })

//funciones obtendra las ordenes del usuario o cliente
//@routes GET /api/orders/:id/myorders
//@access Private
const getOrdersById = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id})

  res.json(orders)
})

//funciones obtendra las ordenes del usuario o cliente
//@routes GET /api/orders/:id/myorders
//@access Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user','id name')

  res.json(orders)
})

//funciones actualiza las ordenes a pagar
//@routes PUT /api/orders/:id/pay
//@access Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
  

export {addOrderItems, getOrderById,updateOrderToPaid,getOrdersById,getOrders,updateOrderToDelivered}