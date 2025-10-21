import { Prisma } from "@prisma/client";

export class User  {
  idUser: number;
  first_name: string;
  last_name: string;
  birthdate: Date;
  nickname?: string;
  description?: string;
  email?: string;
  address?: string;
  phonenumber?: string;
  password: string;
  type_user: string;
}