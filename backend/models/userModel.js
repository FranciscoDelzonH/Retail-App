import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema= mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
})

//metodo para comparar las contraseñas en el login
userSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){  // metodo para encriptar la contraseña al momento de registrar un nuevo usuario
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

// ahora creamos el modelo para nuestro esquema creado con anterioridad
const User = mongoose.model('User',userSchema)

export default User