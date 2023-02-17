import { config } from "dotenv"
import express,{ Express, Request, Response, } from "express"
import authRoute from "./routers/authRoute"
import employeeRoute from "./routers/employeeRoute"
import "reflect-metadata"
import departmentRoute from "./routers/departmentRoute"
import { dbConnection } from "./config/dbConnection"

const app: Express = express()
config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/employee",employeeRoute)
app.use("api/v1/department",departmentRoute)
//Todo:holiday and leave route


//databse connection
dbConnection()


app.get("/", (req: Request, res: Response) => {
  res.json({msg:"Hello World!"})
})

//JWT secret
// console.log(require('crypto').randomBytes(64).toString('hex'))

//app listening
const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is started at localhost:${PORT}`)
});