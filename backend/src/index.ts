import { Hono } from 'hono'
import {userRouter} from './routes/user';
import {blogRouter} from './routes/blog';
const app = new Hono();


// "c" here stands for context, context has everything req,res,next,body,headers and a lots of other thing
app.get("/",(c):any=>{
    return c.text("Welcome Home!")
})

app.route("/api/v1",userRouter)
app.route("/api/v1",blogRouter)



export default app
