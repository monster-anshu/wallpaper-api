import { HttpException } from '@utils/response';
import AdminModel from '@models/admin.model';
import { verify } from '@utils/jwt';
import type { Handler } from 'express';
export default class AdminMiddleware {
  public authAdmin: Handler = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      const payload = verify(token);
      const admin = await AdminModel.findById(payload.userId);
      if (!admin) {
        throw new HttpException(401, 'Admin not found');
      }
      req.admin = {
        _id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        password: admin.password,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
}
