import { Hono } from "hono";
import { authMiddleware } from "../middleWare";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput,updateBlogInput } from "@shravanchinchkar/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    // JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>().basePath("/blog");

//Following is the middleWare
// it says that any request comming to /bolg/*  (* means any thing after /blog/) will first execute the middleware the only will pass to the actual handler

//middleware extract the userId and pass it down to the route Handler
blogRouter.use("/*", authMiddleware);

//following route create the blog
blogRouter.post("/", async (c) => {
  console.log("In POST route for Blog!");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Incorrect Inputs!" });
  } else {
    try {
      const userId = c.get("userId");
      console.log("userId is :", userId);
      const createdBlog = await prisma.blog.create({
        data: {
          authorId: userId,
          title: body.title,
          content: body.content,
        },
      });
      return c.json({
        message: "Blog Created!",
        blog: createdBlog,
      });
    } catch (err) {
      console.log(err);
      c.status(403);
      return c.json({ message: "Can't Upload the Blog!" });
    }
  }
});

//following route is used to update the blog

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Incorrect Inputs!" });
  } else {
    try {
      const updatedBlog = await prisma.blog.update({
        where: {
          id: body.id,
        },
        data: {
          title: body.title,
          content: body.content,
        },
      });
      return c.json({
        message: "Blog Updated!",
        updatedBlog: updatedBlog,
      });
    } catch (err) {
      console.log(err);
      c.status(403);
      return c.json({
        blogId: body.id,
        message: "Can't Update the Blog!",
      });
    }
  }
});

//following blog Return all the blogs on the dashboard!
//Need To add pagination to this route
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const allBlogs = await prisma.blog.findMany({});
    return c.json({
      blogs: allBlogs,
    });
  } catch (err) {
    c.status(411);
    return c.json({
      message: "Error while fetching the blogs!",
    });
  }
});

//Here the id is the Request Parameter not query parameters
//following route is used to get a specific blog
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const reqParams = c.req.param("id");
  //   const body = await c.req.json();

  try {
    const findBlog = await prisma.blog.findFirst({
      where: {
        id: reqParams,
      },
    });
    return c.json({
      message: "Blog returned!",
      blogIs: findBlog,
    });
  } catch (err) {
    console.log(err);
    c.status(411);
    return c.json({ message: "Blog not present!" });
  }
});
