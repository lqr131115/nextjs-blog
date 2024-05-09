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
  comments: number;
  is_publish: boolean;
  is_delete: number;
  create_time: Date;
  update_time: Date;
  user: User;
  [key: string]: any;
}

export type ISession = IronSession & { verifyCode: string };
