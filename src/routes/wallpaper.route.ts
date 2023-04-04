import { Router } from 'express';
import type { Routes } from '@interfaces/routes.interface';
import Multer from 'multer';
import AdminMiddleware from '@middlewares/admin.middleware';
import WallpaperController from '@controllers/wallpaper.controller';

export default class WallpaperRoute implements Routes {
  public path = '/wallpaper';
  public router = Router();

  private wallpaperController = new WallpaperController();
  private adminMiddleware = new AdminMiddleware();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.multer.single('file'), this.adminMiddleware.authAdmin, this.wallpaperController.upload);
    this.router.delete(`${this.path}/:_id`, this.adminMiddleware.authAdmin, this.wallpaperController.deleteById);
    this.router.get(`${this.path}`, this.wallpaperController.getAll);
    this.router.get(`${this.path}/id/:_id`, this.wallpaperController.getById);
    this.router.get(`${this.path}/category/:category`, this.wallpaperController.getByCategory);
  }

  private multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 500kb, you can change as needed.
    },
    fileFilter(req, file, callback) {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
        return;
      }
      callback({
        message: 'File should be png / jpg / jpeg',
        name: 'File formate Error',
      });
    },
  });
}
