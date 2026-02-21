// * News Feed Definition
export interface NewsFeed {
  id: number;
  title: string;
  content: string;
  author?: string;
  image?: string;
  isActive: boolean;
  created?: string;
}
