import { NextResponse } from 'next/server';

// Reset the current level to 1
let currentLevel = 1;

export async function POST() {
  // Reset the current level to 1
  currentLevel = 1;
  
  return NextResponse.json({ currentLevel });
}

export async function GET() {
  return NextResponse.json({ currentLevel });
} 