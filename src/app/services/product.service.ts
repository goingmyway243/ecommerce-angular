import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = signal<Product[]>([
    {
      id: 1,
      name: 'Dragon Slayer Sword',
      description: 'Legendary sword forged in volcanic fire. Deals extra damage to dragons. Hand-crafted by the ancient smiths of the Iron Mountains, this blade glows with an inner heat that never fades.',
      price: 49.99,
      imageUrl: 'https://placehold.co/600x400/1a1a1a/00ffff?text=Dragon+Slayer',
      category: 'Weapon'
    },
    {
      id: 2,
      name: 'Cyberpunk Skin Pack',
      description: 'Futuristic aesthetic for all your gear with neon highlights. This pack includes 5 unique weapon skins and a full armor set recolor that pulses with the beat of the city.',
      price: 19.99,
      imageUrl: 'https://placehold.co/600x400/1a1a1a/ff00ff?text=Cyber+Skin',
      category: 'Skin'
    },
    {
      id: 3,
      name: 'Eternal Stamina Potion',
      description: 'Unlimited stamina for 1 hour. Perfect for long dungeon raids. Brewed from the essence of a thousand endurance lilies, this potion ensures you never tire, no matter the challenge.',
      price: 9.99,
      imageUrl: 'https://placehold.co/600x400/1a1a1a/00ff00?text=Stamina+Potion',
      category: 'Power-up'
    },
    {
      id: 4,
      name: 'Shadow Assassin Cloak',
      description: 'Become nearly invisible in low-light environments. Woven from the silk of shadow spiders, this cloak dampens sound and bends light around the wearer.',
      price: 29.99,
      imageUrl: 'https://placehold.co/600x400/1a1a1a/555555?text=Assassin+Cloak',
      category: 'Skin'
    },
    {
      id: 5,
      name: 'Thunderbolt Bow',
      description: 'Fires arrows imbued with electrical energy. Each shot rings out with a crack of thunder and has a chance to paralyze enemies on impact.',
      price: 39.99,
      imageUrl: 'https://placehold.co/600x400/1a1a1a/ffff00?text=Thunderbolt+Bow',
      category: 'Weapon'
    }
  ]);

  // Search and Filter State
  public searchQuery = signal<string>('');
  public selectedCategory = signal<string>('All');

  public allProducts = this.products.asReadonly();

  // Computed signal for filtered products
  public filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();

    return this.products().filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(query) || 
                           product.description.toLowerCase().includes(query);
      const matchesCategory = category === 'All' || product.category === category;
      
      return matchesSearch && matchesCategory;
    });
  });

  // Unique categories for filtering
  public categories = computed(() => {
    const cats = this.products().map(p => p.category);
    return ['All', ...new Set(cats)];
  });

  public getProductById(id: number) {
    return this.products().find(p => p.id === id);
  }
}
