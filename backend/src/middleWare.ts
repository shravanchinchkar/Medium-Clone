import { Hono } from "hono";
import { verify } from "hono/jwt";
const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
}>();

export async function authMiddleware(c: any, next: any) {
  console.log("Middleware called!");

  const header = c.req.header("Authorization");
  if (!header) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  //below line dose the follwoing=>  Bearer token =>["Bearer","token"]
  const token = header.split(" ")[1]; // finalToken has the =>token

  const verifiedToken = await verify(token, c.env.JWT_SECRET);
  if (!verifiedToken.id) {
    c.status(403);
    c.json({ error: "unauthorized" });
  } else {
    await next();
  }
}
