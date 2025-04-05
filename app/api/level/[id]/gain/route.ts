import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Level from '@/models/Level';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const levelId = parseInt(params.id);
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const newItem = { text, timestamp };

    let level = await Level.findOne({ levelId });

    if (!level) {
      level = await Level.create({
        levelId,
        gainItems: [newItem],
        loseItems: [],
      });
    } else {
      level.gainItems.push(newItem);
      await level.save();
    }

    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error adding gain item:', error);
    return NextResponse.json(
      { error: 'Failed to add gain item' },
      { status: 500 }
    );
  }
} 