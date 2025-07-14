import { NextRequest, NextResponse } from "next/server";
import { handleSessionOnEdge } from "@frontegg/nextjs/edge";

export const middleware = async (request: any) => {
  const { pathname, searchParams } = request.nextUrl;
  const headers = request.headers;

  // Catch /frontegg/identity/resources/users/v1/me/authorization requests and log headers
  if (pathname.includes("/me/authorization")) {
    console.log("=== Authorization Request ===");
    console.log("Headers:", Object.fromEntries(headers.entries()));
    console.log("Referrer:", headers.get("referer") || "No referrer");
    console.log("============================");
  }

  // Additional logic if needed
  return handleSessionOnEdge({ request, pathname, searchParams, headers });
};

export const config = {
  matcher: "/(.*)",
};
// Old with header logs 9.2.2-alpha.13994474816

// New 9.2.8-alpha.15853164109
