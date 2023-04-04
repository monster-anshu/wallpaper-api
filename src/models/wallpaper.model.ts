import { Schema, model } from 'mongoose';
import { IWallpaper, categories } from '@interfaces/models.interface';
const WallpaperSchema = new Schema<IWallpaper>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'admin', required: true },
    tags: {
      type: [{ type: String }],
      default: [],
    },
    category: {
      type: String,
      enum: categories,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const WallpaperModel = model<IWallpaper>('wallpaper', WallpaperSchema);

export default WallpaperModel;
