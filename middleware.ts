import { NextRequest, NextResponse } from "next/server";
import { handleSessionOnEdge } from "@frontegg/nextjs/edge";

export const middleware = async (request: any) => {
  const { pathname, searchParams } = request.nextUrl;
  const headers = request.headers;
  const ip = request?.ip;
  console.log(`ip: `, ip);
  // Additional logic if needed

  if (process.env.FRONTEGG_FORWARD_IP === "true") {
    console.log("inside FRONTEGG_FORWARD_IP middleware");
    // headers.set('x-forwarded-for', ip || headers.get('x-real-ip') || '');
    headers.set("x-forwarded-for", "testttt");
  }

  console.log("X-Forwarded-For", headers.get("x-forwarded-for"));
  console.log("x-real-ip", headers.get("x-real-ip"));

  return handleSessionOnEdge({ request, pathname, searchParams, headers });
};

export const config = {
  matcher: "/(.*)",
};
// 9.2.2-alpha.13540668007
