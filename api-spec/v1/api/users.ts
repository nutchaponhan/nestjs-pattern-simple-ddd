import { z } from "zod";
import { c, SECURITY_METADATA } from "../../libs/contract";

export const usersContract = c.router(
  {
    get: {
      method: "GET",
      path: "/users",
      responses: {
        200: z.array(z.object({ id: z.number(), name: z.string() })),
      },
      summary: "get users",
    },
    getId: {
      method: "GET",
      path: "/users/:id",
      pathParams: z.object({
        id: z.coerce.number(),
      }),
      responses: {
        200: z.object({
          id: z.number(),
          name: z.string(),
          city: z.object({
            id: z.number(),
            name: z.string(),
          }),
        }),
      },
      summary: "get user by id",
    },
  },
  SECURITY_METADATA
);
