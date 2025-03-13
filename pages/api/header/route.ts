export function GET(request: Request) {
    const ip = request.headers.get('x-forwarded-for');
    return new Response(`IP: ${ip}`);
  }