const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        //const conn = await mongoose.connect(process.env.MONGO_URI);
        const conn = await mongoose.connect('mongodb+srv://dbUser:dbUser@cluster0.ybz98jx.mongodb.net/?retryWrites=true&w=majority')
              console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}
module.exports = connectDB