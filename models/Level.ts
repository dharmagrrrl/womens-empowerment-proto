import mongoose from 'mongoose';

const LevelSchema = new mongoose.Schema({
  levelId: {
    type: Number,
    required: true,
    unique: true,
  },
  gainItems: [{
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  }],
  loseItems: [{
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  }],
});

export default mongoose.models.Level || mongoose.model('Level', LevelSchema); 