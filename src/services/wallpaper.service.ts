import * as uuid from 'uuid';
import { bucket } from '@databases/firebase';
import { logger } from '@utils/logger';
import type { IWallpaper } from '@interfaces/models.interface';
import WallpaperModel from '@models/wallpaper.model';

export default class WallpaperService {
  private polulate = {
    path: 'author',
    select: {
      _id: true,
      email: true,
      name: true,
    },
  };

  public upload({ imageBuffer, extention }: { imageBuffer: Buffer; extention: string }) {
    const filename = uuid.v4() + '_' + new Date().toISOString() + '.' + extention;
    const file = bucket.file(`wallapers/${filename}`);
    const fileUrl = file.publicUrl();
    file
      .save(imageBuffer)
      .then(() => {
        file.makePublic();
        logger.info('Upload Successful');
      })
      .catch(() => {
        logger.error('Error on Upload');
      });
    return fileUrl;
  }

  public async add(data: IWallpaper) {
    const wallpaper = await WallpaperModel.create({
      author: data.author,
      category: data.category,
      name: data.name,
      tags: data.name,
      url: data.url,
    });
    return wallpaper.populate(this.polulate);
  }

  public async getById(id: string) {
    const wallpaper = await WallpaperModel.findById(id).populate(this.polulate);
    if (!wallpaper) return null;
    return wallpaper.toJSON();
  }

  public async deleteById(id: string) {
    const wallaper = WallpaperModel.findById(id).deleteOne();
    return wallaper;
  }

  public async getByIdWithUser(id: string) {
    const wallpaper = await WallpaperModel.findById(id).populate(this.polulate);
    if (!wallpaper) return null;
    return wallpaper.toJSON();
  }

  public async getByCatgory(category: IWallpaper['category']) {
    const wallpapers = await WallpaperModel.find({ category }).populate(this.polulate);
    return wallpapers;
  }

  public async getByAuthor(author: IWallpaper['author']) {
    const wallpapers = await WallpaperModel.find({ author }).populate(this.polulate);
    return wallpapers;
  }

  public async getAll() {
    const wallpapers = await WallpaperModel.find().populate(this.polulate);
    return wallpapers;
  }
}
