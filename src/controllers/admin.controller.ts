import AdminService from '@services/admin.service';
import validateZod from '@utils/zod';
import AdminValidation from '@validations/admin.validation';
import type { Handler } from 'express';
import { NODE_ENV } from '@config';
import { HttpResponse } from '@utils/response';

export default class AdminController {
  private adminService = new AdminService();
  private adminValidation = new AdminValidation();

  public login: Handler = async (req, res, next) => {
    try {
      const { body } = req;
      const { email, password } = validateZod(body, this.adminValidation.login);
      const token = await this.adminService.login(email, password);
      res.cookie('token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
      });
      res.json(new HttpResponse(token));
    } catch (error) {
      next(error);
    }
  };
  public signup: Handler = async (req, res, next) => {
    try {
      const { body } = req;
      const { email, name, password } = validateZod(body, this.adminValidation.signup);
      const token = await this.adminService.signup({ email, password, name });
      res.json(new HttpResponse(token));
    } catch (error) {
      next(error);
    }
  };

  public getWithoutPassword: Handler = async (req, res, next) => {
    try {
      const { _id } = req.admin;
      const admin = await this.adminService.getWithoutPassword(_id);
      res.json(new HttpResponse(admin));
    } catch (error) {
      next(error);
    }
  };

  public logout: Handler = async (req, res, next) => {
    try {
      res.clearCookie('token');
      res.json({ isSuccess: true });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword: Handler = async (req, res, next) => {
    try {
      const { body } = req;
      const { email } = validateZod(body, this.adminValidation.forgotPassword);
      await this.adminService.forgotPassword(email);
      res.json(new HttpResponse(null, 'Password reset code sent successfully'));
    } catch (error) {
      next(error);
    }
  };

  public resetPassword: Handler = async (req, res, next) => {
    try {
      const { body } = req;
      const { email, code, password } = validateZod(body, this.adminValidation.resetPassword);
      await this.adminService.resetPassword(email, code, password);
      res.json(new HttpResponse(null, 'Password reset successfully'));
    } catch (error) {
      next(error);
    }
  };
}
