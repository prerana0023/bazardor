export type Market = {
  name: string;
  area: string; // division
  min: number;
  max: number;
  avg: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  category: string; // category slug
  categoryName: string;
  unit: string;
  price: number;
  change: number; // percent, +up / -down
  description: string;
  tags: string[];
  markets: Market[];
  min: number;
  max: number;
  avg: number;
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
};