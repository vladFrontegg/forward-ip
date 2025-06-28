import { NextRequest, NextResponse } from "next/server";
import { handleSessionOnEdge } from "@frontegg/nextjs/edge";

export const middleware = async (request: any) => {
  const { pathname, searchParams } = request.nextUrl;
  const headers = request.headers;
  // Additional logic if needed

  headers.set("x-forwarded-for", "test123");
  headers.set("x-frontegg-test-header", "test123");
  console.log("headers my-test-header", headers.get("x-frontegg-test-header"));
  const cfViewer = headers.get("cloudfront-viewer-address");
  console.log("cloudfront-viewer-address", cfViewer);

  return handleSessionOnEdge({ request, pathname, searchParams, headers });
};

export const config = {
  matcher: "/(.*)",
};
// Old with header logs 9.2.2-alpha.13994474816

// New 9.2.8-alpha.15853164109
