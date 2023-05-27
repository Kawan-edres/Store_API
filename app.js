require('dotenv').config();
require('express-async-errors');

//db require
const connectDb=require("./db/connect");

// async Errors
const  express=require('express');
const app=express();

//calling middlewares
const notFoundMiddleware=require('./middleware/not-found');
const errorMiddleware=require("./middleware/error-handler");

//calling Router
const productsRouter=require("./routes/products")

//middlewares
app.use(express.json());


//routes
app.get("/",(req,res)=>{
    res.send('<h1>Store Api</h1><a href="/api/v1/products">products Route </a>');
})

//prducts route
app.use("/api/v1/products",productsRouter);




app.use(notFoundMiddleware);
app.use(errorMiddleware);


const port=process.env.PORT || 3000;

//startig the server and Db connnection
 const start=async()=>{
    try {
        // connect Db
        await connectDb(process.env.MONGO_URI);
        app.listen(port,console.log("server is running on port 3000"))
        
    } catch (error) {
        console.log(error)
        
    }
 }

 start();
