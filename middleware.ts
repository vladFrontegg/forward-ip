import { NextRequest, NextResponse } from "next/server";
import { handleSessionOnEdge } from "@frontegg/nextjs/edge";

export const middleware = async (request: any) => {
  const { pathname, searchParams } = request.nextUrl;
  const headers = request.headers;
  // Additional logic if needed

  // if (process.env.FRONTEGG_FORWARD_IP === "true") {
  //   console.log("inside FRONTEGG_FORWARD_IP middleware");
  //   // headers.set('x-forwarded-for', ip || headers.get('x-real-ip') || '');
  //   headers.set("x-forwarded-for", "testttt");
  // }

  return handleSessionOnEdge({ request, pathname, searchParams, headers });
};

export const config = {
  matcher: "/(.*)",
};
// Old with header logs 9.2.2-alpha.13994474816

// New 9.2.8-alpha.15853164109
