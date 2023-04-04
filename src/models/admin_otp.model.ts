import { IAdminOtp } from '@interfaces/models.interface';
import { Schema, model } from 'mongoose';
const AdminOtpSchema = new Schema<IAdminOtp>(
  {
    code: { type: Number, required: true },
    admin: { type: Schema.Types.ObjectId, ref: 'admin', required: true, unique: true },
    expireAt: { type: Date, default: Date.now, expires: 300 },
  },
  {
    timestamps: true,
  },
);
const AdminOtpModel = model<IAdminOtp>('admin_otp', AdminOtpSchema);
export default AdminOtpModel;
