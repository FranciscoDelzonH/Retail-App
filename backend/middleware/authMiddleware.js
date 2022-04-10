import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async(req,res,next)=>{
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {  // lo que haremos aca sera decodificar el token
            token = req.headers.authorization.split(' ')[1]; //separamos el bearer del token original
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            next(); //para que continue despues de obtener el token sino la peticion quedaria en un bucle infito al hacer la peticion GET 
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Acceso restringido, token no encontrada')
        }
    }else{
        res.status(401)
        throw new Error('Acceso restringido')
    } 
})

const admin = (req,res,next) => {
    if (req.user && req.user.isAdmin) {
        next()
    }else{
        res.status(401);
        throw new Error ('Acceso no autorizado');
    }
}

export {protect, admin}