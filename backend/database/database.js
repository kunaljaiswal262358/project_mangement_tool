import mongoose from 'mongoose'

const mongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected successfully")
    } catch(error) {
        console.error("Mongodb connection failed",error)
        process.exit(1)
    }
}

export default mongodb;