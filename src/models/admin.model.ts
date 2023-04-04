import { Schema, model } from 'mongoose';
import type { IAdmin } from '@interfaces/models.interface';
import * as bcrypt from 'bcrypt';

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

AdminSchema.pre('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const admin = this;
  if (!this.isModified('password')) {
    return next();
  }
  admin.password = bcrypt.hashSync(admin.password, 10);
  next();
});

const AdminModel = model<IAdmin>('admin', AdminSchema);
export default AdminModel;
