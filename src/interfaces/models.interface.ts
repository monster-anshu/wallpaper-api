export const categories = ['minimal', 'abstract'] as const;
export interface IAdmin {
  name: string;
  email: string;
  password: string;
}
export interface IWallpaper {
  name: string;
  url: string;
  tags: string[];
  category: typeof categories[number];
  author: IAdmin & {
    _id: string;
  };
}

export interface IOTP {
  code: number;
  expireAt: Date;
}

export interface IAdminOtp extends IOTP {
  admin: IAdmin & {
    _id: string;
  };
}
