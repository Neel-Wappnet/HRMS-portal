import { config } from "dotenv"
import express,{ Express, Request, Response, } from "express"
import loginRoute from "./routers/login.route"

const app: Express = express()
config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1",loginRoute)

app.get("/", (req: Request, res: Response) => {
  res.json({msg:"Hello World!"})
})



const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is started at localhost:${PORT}`)
});