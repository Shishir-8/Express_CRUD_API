import mongoose from 'mongoose'



const connectDB = ()=>{

mongoose.connect('mongodb://localhost:27017/students')
.then(()=> {
    console.log("Connected to databases")
}).catch((error)=>{
    console.log(error)
})

}

export default connectDB