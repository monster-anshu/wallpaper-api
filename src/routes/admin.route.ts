import { Router } from 'express';
import type { Routes } from '@interfaces/routes.interface';
import AdminController from '@controllers/admin.controller';
import AdminMiddleware from '@middlewares/admin.middleware';

export default class AdminRoute implements Routes {
  public path = '/admin';
  public router = Router();

  private adminController = new AdminController();
  private adminMiddleware = new AdminMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.adminController.login);
    this.router.post(`${this.path}/logout`, this.adminController.logout);
    this.router.post(`${this.path}/signup`, this.adminController.signup);
    this.router.get(`${this.path}/me`, this.adminMiddleware.authAdmin, this.adminController.getWithoutPassword);
    this.router.post(`${this.path}/forgot-password`, this.adminController.forgotPassword);
    this.router.post(`${this.path}/reset-password`, this.adminController.resetPassword);
  }
}
