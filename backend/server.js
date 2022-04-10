import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectdb from './config/db.js';
// aca pasamos los productos
import router from './routes/productRoute.js'
import userRoutes from './routes/userRoutes.js';
import {notFound, errorHandler} from './middleware/errorMidd.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import morgan from 'morgan'

dotenv.config();

connectdb()

const app= express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())



app.use('/api/products',router)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

app.get('/api/config/paypal',(req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    
    app.get('*', (req,res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
}else{
    app.get('/',(req,res)=>{
        res.send('<--------API is running---------->')
    })
}


//mostrar en caso de que no exista la ruta a la que se esta buscando
app.use(notFound)


//mostrar y arreglar lo que viene por defecto en los mensajes de no encontrado por html que mostraban otras cosas
app.use(errorHandler)

const PORT= process.env.PORT || 5000 //si no encuentra el puerto en nuestras variables de entorno tome este valor como ruta 

app.listen(PORT, console.log(`servidor corriendo en ${process.env.NODE_ENV} en puerto ${PORT}`))