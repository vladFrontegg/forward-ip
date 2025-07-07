import { FronteggApiMiddleware } from "@frontegg/nextjs/middleware";
import { NextApiRequest } from "next";

export default FronteggApiMiddleware.withOptions({
  getClientIp: (req: NextApiRequest) => {
    return "testttt";
  },
});

export const config = {
  api: {
    externalResolver: true,
    // https://nextjs.org/docs/messages/api-routes-response-size-limit
    responseLimit: false,
  },
};
