import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Level from '@/models/Level';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const levelId = parseInt(params.id);

    let level = await Level.findOne({ levelId });

    if (!level) {
      // Create a new level if it doesn't exist
      level = await Level.create({
        levelId,
        gainItems: [],
        loseItems: [],
      });
    }

    return NextResponse.json(level);
  } catch (error) {
    console.error('Error fetching level:', error);
    return NextResponse.json(
      { error: 'Failed to fetch level data' },
      { status: 500 }
    );
  }
} 