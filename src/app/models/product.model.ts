export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'Weapon' | 'Skin' | 'Power-up';
}

export interface CartItem extends Product {
  quantity: number;
}
