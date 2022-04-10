import User from '../models/userModel.js'
import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateTokens.js';


// POST envia los usuarios ya creados a la bd para logear
// ACCESO PUBLICO
const authUser = asyncHandler(async(req,res)=>{

    const {email,password}=req.body;
    const user = await User.findOne({email})


    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// POST Registra a los nuevos usuari@s
// ACCESO PUBLICO
const registerUser = asyncHandler(async(req,res)=>{

    const {name,email,password}=req.body;
    const userExists = await User.findOne({email})


    if (userExists) {
        res.status(400)
        throw new Error('Usuario ya existente')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Campo invalido')
    }
})

// GET obtiene los usuarios para logearse
// ACCESO PRIVADO
const getUserProfile = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error ('Usuario no encontrado')
    }
})

// UPDATE PUT EDITA DATOS DE USUARIOS YA EXISTENTES
// ACCESO PRIVADO
const updateUserProfile = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error ('Usuario no encontrado')
    }
})


// GET obtiene todos los usuarios para el ADMIN
// ACCESO PRIVADO
const getUsers = asyncHandler(async(req,res)=>{

    const users = await User.find({});
    res.json(users);

})

// DELETE eliminar usuario por id
// ACCESO PRIVADO
const deleteUser = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove()
        res.json({message: 'Usuario eliminado'})
    }else{
        res.status(404)
        throw new Error ('Usuario no encontrado')
    }

})

// obtener usuario por ID para actualizar sus privilegios
const getUserById = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user);
    }else{
        res.status(404)
        throw new Error('Usuario no encontrado')
    }

})

// UPDATE PUT EDITA DATOS DE USUARIOS YA EXISTENTES solo por el ADMIN
// ACCESO PRIVADO
const updateUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error ('Usuario no encontrado')
    }
})

export{
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,

}