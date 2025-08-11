import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Path to store subscribers
const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json')

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(SUBSCRIBERS_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Load existing subscribers
async function loadSubscribers() {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Save subscribers
async function saveSubscribers(subscribers: any[]) {
  await ensureDataDir()
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }
    
    // Load existing subscribers
    const subscribers = await loadSubscribers()
    
    // Check if email already exists
    if (subscribers.find((s: any) => s.email === email)) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }
    
    // Add new subscriber
    const newSubscriber = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    }
    
    subscribers.push(newSubscriber)
    await saveSubscribers(subscribers)
    
    console.log('New subscriber added:', newSubscriber)
    
    return NextResponse.json({ 
      success: true,
      message: 'Successfully subscribed!',
      subscriber: newSubscriber
    })
    
  } catch (error) {
    console.error('Error subscribing:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

// GET endpoint to view all subscribers (for admin use)
export async function GET(req: NextRequest) {
  try {
    const subscribers = await loadSubscribers()
    return NextResponse.json({ subscribers })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load subscribers' },
      { status: 500 }
    )
  }
}
