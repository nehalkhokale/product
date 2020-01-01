export interface User {
    _id: number;
    name: any;
    gender: string;
    email: string;
    role: string;
    createdAt:Date;
    updattedAt:Date;
    updatedBy:any;
    createdBy:any;
    remarks:any;
    mobile: string;
    isActive: boolean;
  }