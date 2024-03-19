const express = require('express')
const db= require('./config/mongoDb')
const cors=require('cors')
const authRouter = require('./router/authRouter')
const feedbackRouter = require('./router/feedbackRouter')
const productRouter = require('./router/productRouter')
const invoiceRouter = require('./router/invoiceRouter')

const app = express();
app.use(cors())
app.use(express.json())
app.use('/auth/v1', authRouter)
app.use('/feedback/v1', feedbackRouter)
app.use('/product/v1', productRouter)
app.use('/invoice/v1', invoiceRouter)


app.get('/health', (req, res) => {
    res.json({service:"Music Cart App",
              status: "Active",
              time: new Date(),})
  })    

// Catch-all middleware for unmatched routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found', success: false });
  });

const port = process.env.port||8000;
app.listen(port, ()=>{
    console.log("Server Started Successfully!!!!", port)
})