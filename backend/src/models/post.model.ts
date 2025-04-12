// post.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  content: string;
  heavenVotes: number;
  hellVotes: number;
  voters: string[];
  authorIp: string;
  approved: boolean;
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  content: { type: String, required: true, trim: true },
  heavenVotes: { type: Number, default: 0 },
  hellVotes: { type: Number, default: 0 },
  voters: { type: [String], default: [] },
  authorIp: { type: String, required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

PostSchema.index({ createdAt: -1 });
PostSchema.index({ heavenVotes: -1 });

export default mongoose.model<IPost>('Post', PostSchema);