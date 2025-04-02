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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; timestamp: string } }
) {
  try {
    await connectDB();
    const levelId = parseInt(params.id);
    const timestamp = parseInt(params.timestamp);

    const level = await Level.findOne({ levelId });

    if (!level) {
      return NextResponse.json(
        { error: 'Level not found' },
        { status: 404 }
      );
    }

    level.gainItems = level.gainItems.filter(
      (item) => item.timestamp !== timestamp
    );

    await level.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gain item:', error);
    return NextResponse.json(
      { error: 'Failed to delete gain item' },
      { status: 500 }
    );
  }
} 