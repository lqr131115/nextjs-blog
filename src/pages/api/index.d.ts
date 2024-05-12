import { User } from "@/db/entity";
import { IronSession } from "iron-session";
export interface IArticle {
  id: number;
  title: string;
  content: string;
  description: string;
  cover: string;
  views: number;
  stars: number;
  likes: number;
  reviews: number;
  is_publish: boolean;
  is_delete: number;
  create_time: Date;
  update_time: Date;
  user: User;
  [key: string]: any;
}

export interface IComment {
  id: number;
  content: string;
  create_time: Date;
  update_time: Date;
  user: any;
  // reply: any[];
  [key: string]: any;
}

export type ISession = IronSession & { verifyCode: string };
