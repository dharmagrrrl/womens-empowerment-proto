import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Level from '@/models/Level';

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