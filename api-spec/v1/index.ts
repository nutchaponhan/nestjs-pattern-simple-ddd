import { z } from "zod";
import { c } from "../libs/contract";
import { usersContract } from "./api/users";
import { authsContract } from "./api/auths";

export const v1Contract = c.router(
  { users: usersContract, auths: authsContract },
  {
    pathPrefix: "/v1",
    commonResponses: {
      400: z.object({ code: z.string(), message: z.string() }),
    },
  }
);
