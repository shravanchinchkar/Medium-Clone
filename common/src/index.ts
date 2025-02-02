import zod from "zod";

//The following zod schema is required for the Backend
export const signupInput = zod.object({
  email: zod.string().email(),
  name: zod.string(),
  password: zod.string().min(6),
});
export const signinInput = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

//The following zod schema is required for the Backend
export const createBlogInput = zod.object({
  title: zod.string(),
  content: zod.string(),
});
export const updateBlogInput = zod.object({
  id: zod.string(),
  title: zod.string(),
  content: zod.string(),
});

//The following zod Inference is required by the frontends
export type SignupInput = zod.infer<typeof signupInput>;
export type SigninInputs = zod.infer<typeof signinInput>;

//The following zod Inference is required by the frontends
export type CreateBlogInput = zod.infer<typeof createBlogInput>;
export type UpdateBlogInput = zod.infer<typeof updateBlogInput>;


