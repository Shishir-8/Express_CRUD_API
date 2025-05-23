import express from 'express'
import userRouter from './routes/user.routes.js'
import connectDB from './db/db.js'
connectDB();


const app = express()



app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use('/api/user', userRouter)

app.listen(3000, ()=>{
    console.log('Server is listening')
})