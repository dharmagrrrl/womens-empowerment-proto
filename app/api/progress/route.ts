import { NextResponse } from 'next/server';

// In a real application, this would be stored in a database
let currentLevel = 1;

export async function GET() {
  return NextResponse.json({ currentLevel });
}

export async function POST(request: Request) {
  const data = await request.json();
  if (typeof data.level === 'number' && data.level > 0 && data.level <= 6) {
    currentLevel = Math.max(currentLevel, data.level);
    return NextResponse.json({ currentLevel });
  }
  return NextResponse.json({ error: 'Invalid level' }, { status: 400 });
} 