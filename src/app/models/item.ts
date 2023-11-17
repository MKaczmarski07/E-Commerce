export interface Item {
  id: string;
  category: string;
  imageUrl: string;
  for: string;
  name: string;
  price: number;
  sizes: string[];
  shortDes: string;
  discountPrice?: number;
  isBestSeller?: boolean;
}
