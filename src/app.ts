import { config } from "dotenv"
import express,{ Express, Request, Response, } from "express"

const app: Express = express()
config()

app.get("/", (req: Request, res: Response) => {
  res.json({msg:"Hello World!"})
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is started at localhost:${PORT}`)
});