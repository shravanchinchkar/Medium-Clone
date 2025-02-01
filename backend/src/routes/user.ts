import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate"; //this command is used to run prisma in acclerate mode, means it helps to connect to the connection pool not directly to the DB
import { sign } from "hono/jwt";

//Whenever we have an environment variable we need to pass a generic has below, so that hono understand the DATABASE_URL is a string and it dose not gives the error
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>().basePath("/user");


// const digestStream = new crypto.DigestStream("SHA-256");

//following is the signin route of the user
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //following line get the body from the user
  const body = await c.req.json();

  //check if email already exists in the DB
  const checkEmail = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  //if exists return the error
  if (checkEmail) {
    // c.status(403);
    console.log("Email already exists!");
    return c.json({ error: "Email already exists!" });
  } else {
    //if not then create the user account
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    console.log("created user is:", user);
    console.log("secret key:", c.env.JWT_SECRET);

    //usually we the thing that we need to sign with is Id of the user, so we have taken the id of the user
    //create a token for the user who has signedup
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      //return the token
      token: token,
    });
  }
});

//following is the signin route for the user
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //following line get the body from the user
  const body = await c.req.json();

  //check if the user is present in the DB
  const checkUser = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  //if the user is doesn't exixts return the following message
  if (!checkUser) {
    c.status(403);
    return c.json({ error: "Invalid Credentials" });
  } else {

    console.log("user is:",checkUser);
    const token = await sign({ id: checkUser.id }, c.env.JWT_SECRET); //create a token for the user who has signedup
    return c.json({
      //return the token
      token: token,
    });
  }
});
