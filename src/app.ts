import { config } from "dotenv"
import express,{ Express, Request, Response, } from "express"
import authRoute from "./routers/authRoute"
import employeeRoute from "./routers/employeeRoute"
import "reflect-metadata"
import departmentRoute from "./routers/departmentRoute"

const app: Express = express()
config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/employee",employeeRoute)
app.use("api/v1/department",departmentRoute)
//Todo:holiday and leave route


//Todo:databse connection


app.get("/", (req: Request, res: Response) => {
  res.json({msg:"Hello World!"})
})


//app listening
const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is started at localhost:${PORT}`)
});