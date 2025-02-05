import { Hono } from "hono";
import { sign } from "hono/jwt";
import { authMiddleware } from "../middleWare";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate"; //this command is used to run prisma in acclerate mode, means it helps to connect to the connection pool not directly to the DB
import { signupInput, signinInput } from "@shravanchinchkar/medium-common";

//Whenever we have an environment variable we need to pass a generic has below, so that hono understand the DATABASE_URL is a string and it dose not gives the error

//Following is the cnnection Pool URL:
//prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNmVkZWZlMGUtZTdiMC00YTdiLTk5NTQtOGUzODE5OWFmZmRiIiwidGVuYW50X2lkIjoiOTI3NGU3NWFmYjYwZDJlNmIzYzY4ZTliODBlZThjNTljYzM3MWI5YzIwZjJlMzQ4YzQzOTVjMDQzMzFiODQ0MSIsImludGVybmFsX3NlY3JldCI6IjcyNDc0YTY0LWU4NDAtNGYyZC04YzkxLThiMDdmMzY1YTE2NSJ9.e8bCn4biras2V61O6RZf4rYZrYERq0R8kFDXin7595Q

// Following is the JWT Secret:-
//prod_shravchinchkar2610200313
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>().basePath("/user");

userRouter.use("/lognedinuser", authMiddleware);

//Todo:- password hashing
userRouter.post("/signup", async (c) => {
  console.log("signup route called!");
  // The environment variable is accessible only inside an route in prisma, so we need to initialize the prisma client in each route
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate()); //this line is imp. if we are using prisma offering acclerate functionality for DB Pooling

  //following line get the body from the user
  const body = await c.req.json();
  console.log("signup body:", body);

  const { success } = signupInput.safeParse(body);
  const zodData = signupInput.safeParse(body);

  if (!success) {
    console.log("zod data:", zodData);
    console.log("zod failed!");
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

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Incorrect Inputs!" });
  } else {
    try {
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
        const token = await sign({ id: checkUser.id }, c.env.JWT_SECRET);
        return c.json({
          message: "SignedIn successful!",
          token: token,
        });
      }
    } catch (e) {
      c.status(403);
      return c.json({ message: "Something went wrong" });
    }
  }
});

//following is the route used to get the login user details

userRouter.get("/lognedinuser",async(c:any)=>{
  console.log("logineduser hit")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


  const userId=c.get("userId");
  console.log("userId from lognedin user is :",userId);

  if(!userId){
    return c.json({
      message:"User id is missing from the request!"
    })
  }

  try{
    const userInfo=await prisma.user.findUnique({
      where:{
        id:userId
      },
      select:{
        name:true
      }
    })
    return c.json(userInfo);
  }catch(err){
    console.log(err);
    return c.json({
      message:"Error occured while getting data of logined user!"
    })
  }
})