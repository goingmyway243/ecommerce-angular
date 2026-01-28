import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = signal<Product[]>([
    {
      id: 1,
      name: 'Dragon Slayer Sword',
      description: 'Legendary sword forged in volcanic fire. Deals extra damage to dragons.',
      price: 49.99,
      imageUrl: 'https://placehold.co/400x300/1a1a1a/00ffff?text=Dragon+Slayer',
      category: 'Weapon'
    },
    {
      id: 2,
      name: 'Cyberpunk Skin Pack',
      description: 'Futuristic aesthetic for all your gear with neon highlights.',
      price: 19.99,
      imageUrl: 'https://placehold.co/400x300/1a1a1a/ff00ff?text=Cyber+Skin',
      category: 'Skin'
    },
    {
      id: 3,
      name: 'Eternal Stamina Potion',
      description: 'Unlimited stamina for 1 hour. Perfect for long dungeon raids.',
      price: 9.99,
      imageUrl: 'https://placehold.co/400x300/1a1a1a/00ff00?text=Stamina+Potion',
      category: 'Power-up'
    },
    {
      id: 4,
      name: 'Shadow Assassin Cloak',
      description: 'Become nearly invisible in low-light environments.',
      price: 29.99,
      imageUrl: 'https://placehold.co/400x300/1a1a1a/555555?text=Assassin+Cloak',
      category: 'Skin'
    },
    {
      id: 5,
      name: 'Thunderbolt Bow',
      description: 'Fires arrows imbued with electrical energy.',
      price: 39.99,
      imageUrl: 'https://placehold.co/400x300/1a1a1a/ffff00?text=Thunderbolt+Bow',
      category: 'Weapon'
    }
  ]);

  public allProducts = this.products.asReadonly();
}
