import { IronSession } from "iron-session";

export interface IUser {
  id: number;
  nickname: string;
  avatar: string;
  [key: string]: any;
}

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
  user: IUser;
  comments: IComment[];
  [key: string]: any;
}

export interface IComment {
  id: number;
  content: string;
  create_time: Date;
  update_time: Date;
  user: IUser;
  // reply: any[];
  [key: string]: any;
}

export interface ITag {
  id: number;
  title: string;
  icon: string;
  follow_count: number;
  article_count: number;
  users: IUser[];
  articles: IArticle[];
  [key: string]: any;
}

export type ISession = IronSession & { verifyCode: string };
