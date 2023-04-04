import { HttpException, HttpResponse } from '@utils/response';
import WallpaperService from '@services/wallpaper.service';
import validateZod from '@utils/zod';
import WallpaperValidation from '@validations/wallpaper.validation';
import { Handler } from 'express';

export default class WallpaperController {
  private wallpaperService = new WallpaperService();
  private wallpaperValidation = new WallpaperValidation();

  public upload: Handler = async (req, res, next) => {
    try {
      const { admin, file, body } = req;
      const wallpaperDetails = validateZod({ ...body, tags: JSON.parse(body.tags) }, this.wallpaperValidation.addWallpaper);
      if (!file) {
        throw new HttpException(400, 'Image file required');
      }
      const fileExtension = file.originalname.split('.').pop() ?? '';
      const url = this.wallpaperService.upload({
        extention: fileExtension,
        imageBuffer: file.buffer,
      });
      const wallpaper = await this.wallpaperService.add({
        ...wallpaperDetails,
        author: {
          ...admin,
        },
        url,
      });
      res.json(new HttpResponse(wallpaper));
    } catch (error) {
      next(error);
    }
  };

  public getById: Handler = async (req, res, next) => {
    try {
      const { params } = req;
      const { _id } = validateZod(params, this.wallpaperValidation.getWallpaperById);
      const wallpaper = await this.wallpaperService.getByIdWithUser(_id);
      res.json(new HttpResponse(wallpaper));
    } catch (error) {
      next(error);
    }
  };

  public getByCategory: Handler = async (req, res, next) => {
    try {
      const { params } = req;
      const { category } = validateZod(params, this.wallpaperValidation.getWallpaperByCategory);
      const wallpapers = await this.wallpaperService.getByCatgory(category);
      res.json(new HttpResponse(wallpapers));
    } catch (error) {
      next(error);
    }
  };

  public getAll: Handler = async (req, res, next) => {
    try {
      const wallpapers = await this.wallpaperService.getAll();
      res.json(new HttpResponse(wallpapers));
    } catch (error) {
      next(error);
    }
  };

  public deleteById: Handler = async (req, res, next) => {
    try {
      const { params } = req;
      const { _id } = validateZod(params, this.wallpaperValidation.deleteById);
      const wallpaper = await this.wallpaperService.deleteById(_id);
      res.json(new HttpResponse(wallpaper));
    } catch (error) {
      next(error);
    }
  };
}
