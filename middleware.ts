import { NextRequest } from 'next/server';
import { handleSessionOnEdge } from '@frontegg/nextjs/edge';

export const middleware = async (request: any) => {
  const { pathname, searchParams } = request.nextUrl;
  const headers = request.headers;
  const ip = request?.ip
  console.log(`ip: `, ip)
  // Additional logic if needed
  
  if (process.env.FRONTEGG_FORWARD_IP === 'true') {
    console.log('headers' , headers);
    headers.set('X-Forwarded-For', ip || headers.get('x-real-ip') || '');
  }
  
  console.log("X-Forwarded-For", headers.get('X-Forwarded-For'))
  console.log("x-real-ip", headers.get('x-real-ip'))

  return handleSessionOnEdge({ request, pathname, searchParams, headers });
};

export const config = {
  matcher: '/(.*)',
};
