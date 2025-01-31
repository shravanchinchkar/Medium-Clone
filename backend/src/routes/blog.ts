import { Hono } from "hono";

export const blogRouter = new Hono().basePath("/blog");


//following is the Middleware
// it says that any request comming to /bolg/*  (* means any thing after /blog/) will first execute the middleware the only will pass to the actual handler

blogRouter.use("/*",async (c,next)=>{
	console.log("Middleware called!")
	await next();
})

blogRouter.post("/", (c) => c.text("Blog post!"));

blogRouter.put("/", (c) => c.text("blog change!"));
//Here the id is the Request Parameter not query parameters
blogRouter.get('/:id', (c) => {
    console.log("Hello get id!")
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})


blogRouter.get("/bulk", (c) => c.text("get all the blogs!"));


