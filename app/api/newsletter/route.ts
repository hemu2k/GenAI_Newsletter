import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json()
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }
    
    // For now, just log the newsletter (we'll add email functionality later)
    console.log('Newsletter created:', { title, content, timestamp: new Date().toISOString() })
    
    return NextResponse.json({ 
      message: 'Newsletter created successfully',
      title,
      content,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error creating newsletter:', error)
    return NextResponse.json(
      { error: 'Failed to create newsletter' },
      { status: 500 }
    )
  }
}
