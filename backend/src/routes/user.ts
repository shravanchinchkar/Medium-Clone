import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate"; //this command is used to run prisma in acclerate mode, means it helps to connect to the connection pool not directly to the DB
import { sign } from "hono/jwt";
import { signupInput } from "@shravanchinchkar/medium-common";
import { signinInput } from "@shravanchinchkar/medium-common";

//Whenever we have an environment variable we need to pass a generic has below, so that hono understand the DATABASE_URL is a string and it dose not gives the error
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>().basePath("/user");

//following is the signin route of the user
//Todo:- password hashing
userRouter.post("/signup", async (c) => {
  // The environment variable is accessible only inside an route in prisma, so we need to initialize the prisma client in each route
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()); //this line is imp. if we are using prisma offering acclerate functionality for DB Pooling

  //following line get the body from the user
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Incorrect Inputs!" });
  } else {
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: body.password,
        },
      });

      console.log("created user is:", user);
      console.log("secret key:", c.env.JWT_SECRET);

      //usually the thing that we need to sign with is Id of the user, so we have taken the id of the user
      //create a token for the user who has signedup
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);

      return c.json({
        message: "SignedUp!",
        token: token, //return the token
      });
    } catch (err) {
      c.status(411);
      return c.json({ message: "Email already exists!" });
    }
  }
});

//following is the signin route for the user
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //following line get the body from the user
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Incorrect Inputs!" });
  } else {
    try {
      //check if the user is present in the DB
      const checkUser = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password,
        },
      });
      if (!checkUser) {
        c.status(403);
        return c.json({ error: "Invalid Credentials" });
      } else {
        console.log("user is:", checkUser);
        const token = await sign({ id: checkUser.id }, c.env.JWT_SECRET); //create a token for the user who has signedup
        return c.json({
          message: "SignedIn successful!",
          token: token, //return the token
        });
      }
    } catch (e) {
      c.status(403);
      return c.json({ message: "Something went wrong" });
    }
  }
});
