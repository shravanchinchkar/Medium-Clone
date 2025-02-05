import { Hono } from "hono";
import { verify } from "hono/jwt";
const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

export async function authMiddleware(c: any, next: any) {
  console.log("Middleware called!");
  const header = c.req.header("Authorization"); //get the header from the user
  console.log("header is:",header)

  if (!header) {
    //if the header is empty execute the following block
    c.status(401);
    return c.json({ error: "unauthorized header" });
  }

  try {
    //below line dose the follwoing=>  Bearer token =>["Bearer","token"]
    const token = header.split(" ")[1]; // finalToken has the =>token
    console.log("token from local storage:",token)

    const verifiedToken = await verify(token, c.env.JWT_SECRET);
    console.log("Verified Id is:", verifiedToken.id);

    if (!verifiedToken.id) {
      c.status(403);
      c.json({ error: "unauthorized token" });
    } else {
      console.log("in next")
      c.set("userId", verifiedToken.id);
      await next();
    }
  } catch (err) {
    c.status(403);
    return c.json({ message: "unauthorized for middleware!" });
  }
}
