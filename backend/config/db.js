import mongoose from 'mongoose';

const connectdb= async()=>{
    try {

        // MONGO_URL DECLARADO COMO VARIABLE DE ENTORNO EN ARCHIVO .ENV
        const conn= await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1)
    }
}

export default connectdb