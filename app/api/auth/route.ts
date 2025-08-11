import { NextRequest, NextResponse } from 'next/server'

// Simple admin credentials (you can change these)
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'newsletter2024'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set a simple session cookie (in production, use proper JWT tokens)
      const response = NextResponse.json({ success: true })
      response.cookies.set('admin-auth', 'true', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      })
      return response
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
