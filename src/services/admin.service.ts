import AdminModel from '@models/admin.model';
import { HttpException } from '@utils/response';
import * as bcrypt from 'bcrypt';
import { sign } from '@utils/jwt';
import { IAdmin } from '@interfaces/models.interface';
import EmailService from './email.service';
import AdminOtpModel from '@/models/admin_otp.model';
export default class AdminService {
  private emailService = new EmailService();

  public async login(email: string, password: string) {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      throw new HttpException(404, 'Email not found');
    }
    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      throw new HttpException(401, 'Incorrect Password');
    }
    const token = sign({
      time: new Date().toISOString(),
      userId: admin._id.toString(),
    });
    return token;
  }

  public async signup(data: IAdmin) {
    const admin = await AdminModel.create({
      email: data.email,
      name: data.name,
      password: data.password,
    });
    const token = sign({
      time: new Date().toISOString(),
      userId: admin._id.toString(),
    });
    return token;
  }

  public async getWithoutPassword(id: string) {
    const admin = await AdminModel.findById(id, '-password');
    if (!admin) {
      return new HttpException(404, 'Admin Not Found');
    }
    return admin.toJSON();
  }

  public async forgotPassword(email: string) {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      throw new HttpException(404, 'Email not found');
    }
    const otp = this.emailService.sendOTP(admin.email);
    const otpDoc = await AdminOtpModel.create({
      admin: admin._id,
      code: otp,
    });

    console.log(otpDoc);
  }

  public async resetPassword(email: string, code: number, password: string) {
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      throw new HttpException(404, 'Email not found');
    }
    const otp = await AdminOtpModel.findOne({ admin: admin._id });
    if (!otp || otp.code !== code) {
      throw new HttpException(400, 'Invalid OTP');
    }
    otp.deleteOne();
    admin.password = password;
    await admin.save();
  }
}
