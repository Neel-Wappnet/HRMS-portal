import { config } from "dotenv"
import express,{ Express, Request, Response, } from "express"
import path from "path"
import morgon from "morgan"
import "reflect-metadata"
import { dbConnection } from "./config/dbConnection"
import authRoute from "./routers/authRoute"
import employeeRoute from "./routers/employeeRoute"
import departmentRoute from "./routers/departmentRoute"
import holidayRoute from "./routers/holidayRoute"
import leaveRoute from "./routers/leaveRoute"
import userRoute from "./routers/userRoute"

//declaring app
const app: Express = express()
config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgon('short'))

//template engine setup
app.set("view engine",'ejs')
app.set('views', path.join(__dirname, 'views'));


//routes
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/employee",employeeRoute)
app.use("/api/v1/department",departmentRoute)
app.use("/api/v1/holiday",holidayRoute)
app.use("/api/v1/leave",leaveRoute)


//databse connection
dbConnection()


//JWT secret
// console.log(require('crypto').randomBytes(64).toString('hex'))

//app listening
const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is started at localhost:${PORT}`)
});