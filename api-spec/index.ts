import { z } from "zod";
import { c } from "./libs/contract";
import { usersContract } from "./v1/users";
import { authsContract } from "./v1/auths";

export const C = c.router(
  { users: usersContract, auths: authsContract },
  {
    commonResponses: {
      400: z.object({ code: z.string(), message: z.string() }),
    },
  }
);
