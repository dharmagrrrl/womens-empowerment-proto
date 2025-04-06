import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Level from '@/models/Level';

interface LoseItem {
  text: string;
  timestamp: number;
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

    level.loseItems = level.loseItems.filter(
      (item: LoseItem) => item.timestamp !== timestamp
    );

    await level.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lose item:', error);
    return NextResponse.json(
      { error: 'Failed to delete lose item' },
      { status: 500 }
    );
  }
} 