export interface Post {
    id: number;
    title: string;
    description: string;
    content?: string;
    author: string;
    authorAvatar?: string;
    country: string;
    tags: string[];
    readTime: number;
    likes: number;
    sticker: string;
    imageUrl?: string;
    date: Date;
    comments?: number;
  }