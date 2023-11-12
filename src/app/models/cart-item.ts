import { Item } from './item';

export interface CartItem extends Item {
  size: string;
  quantity: number;
}
