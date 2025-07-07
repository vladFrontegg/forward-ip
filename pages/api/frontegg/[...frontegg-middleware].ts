import { FronteggApiMiddleware } from "@frontegg/nextjs/middleware";
import { NextApiRequest } from "next";

export default FronteggApiMiddleware.withOptions({
  getClientIp: (req: NextApiRequest) => {
    console.log("req", JSON.stringify(req));
    return "127.1.1.1";
  },
});

export const config = {
  api: {
    externalResolver: true,
    // https://nextjs.org/docs/messages/api-routes-response-size-limit
    responseLimit: false,
  },
};
