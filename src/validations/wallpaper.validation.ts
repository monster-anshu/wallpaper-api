import { categories } from '@interfaces/models.interface';
import { z } from 'zod';

export default class WallpaperValidation {
  readonly addWallpaper = z.object({
    name: z.string().min(3),
    tags: z.array(z.string()),
    category: z.enum(categories),
  });

  readonly getWallpaperById = z.object({
    _id: z.string(),
  });

  readonly deleteById = z.object({
    _id: z.string(),
  });

  readonly getWallpaperByCategory = z.object({
    category: z.enum(categories),
  });
}
