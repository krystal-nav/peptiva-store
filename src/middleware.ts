import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
// Default to DE (Germany) as representative EU country
const DEFAULT_REGION = "de"

/**
 * Simplified middleware for EU-only store
 * Sets region to EU/EUR by default and manages cache
 */
export async function middleware(request: NextRequest) {
  // Skip middleware for static assets
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next()
  }

  let cacheIdCookie = request.cookies.get("_medusa_cache_id")
  let cacheId = cacheIdCookie?.value || crypto.randomUUID()
  
  const response = NextResponse.next()

  // Set cache ID if not already set
  if (!cacheIdCookie) {
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
  }

  // Set EU region cookie (DE as default EU country)
  const countryCodeCookie = request.cookies.get("_medusa_country_code")
  if (!countryCodeCookie) {
    response.cookies.set("_medusa_country_code", DEFAULT_REGION, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax",
    })
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}