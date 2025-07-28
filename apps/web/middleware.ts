import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url)) // Redirect to the /auth/login page after this version
  }

  // Token exists → allow to proceed
  return NextResponse.next()
}

// Apply to dashboard pages only
export const config = {
  matcher: ['/dashboard/:path*'],
}

