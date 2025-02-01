import { Hono } from "hono";
import { authMiddleware } from "../middleWare";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    // JWT_SECRET: string;
  };
}>().basePath("/blog");

//Following is the middleWare
// it says that any request comming to /bolg/*  (* means any thing after /blog/) will first execute the middleware the only will pass to the actual handler

// blogRouter.use("/*", async (c, next) => {
//   const header = c.req.header("Authorization");
//   if (!header) {
//     c.status(401);
//     return c.json({ error: "unauthorized" });
//   }

//   //below line dose the follwoing=>  Bearer token =>["Bearer","token"]
//   const token = header.split(" ")[1]; // finalToken has the =>token

//   const verifiedToken = await verify(token, c.env.JWT_SECRET);
//   if (!verifiedToken.id) {
//     c.status(403);
//     c.json({ error: "unauthorized" });
//   } else {
//     await next();
//   }
// });

blogRouter.use("/*",authMiddleware);

blogRouter.post("/", (c) => c.text("Blog post!"));

blogRouter.put("/", (c) => c.text("blog change!"));

//Here the id is the Request Parameter not query parameters
blogRouter.get("/:id", (c) => {
  return c.text("UnderConstruction");
});

blogRouter.get("/bulk", (c) => c.text("get all the blogs!"));
