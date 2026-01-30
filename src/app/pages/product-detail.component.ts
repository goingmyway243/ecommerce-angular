import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink],
  template: `
    <div class="container">
      @if (product(); as p) {
        <div class="product-detail-card">
          <div class="image-container">
            <a routerLink="/"><i class="pi pi-arrow-left back-icon"></i></a>
            <img [src]="p.imageUrl" [alt]="p.name">
          </div>
          <div class="content">
            <span class="category-tag">{{ p.category }}</span>
            <h1>{{ p.name }}</h1>
            <p class="description">{{ p.description }}</p>
            <div class="footer">
              <span class="price">{{ p.price | currency }}</span>
              <button class="btn-add" (click)="onAddToCart(p)">
                <i class="pi pi-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      } @else {
        <div class="not-found">
          <h2>Product not found.</h2>
          <a routerLink="/" class="btn-primary">Back to Shop</a>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 2rem;
    }
    .container {
      max-width: 900px;
      margin: 2rem auto;
    }
    .product-detail-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
      background: rgba(30, 30, 30, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      overflow: hidden;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }
    .image-container {
      position: relative;
    }
    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .back-icon {
      position: absolute;
      top: 1rem;
      left: 1rem;
      font-size: 1.5rem;
      color: #fff;
      background: rgba(0,0,0,0.4);
      border-radius: 50%;
      padding: 0.5rem;
      transition: background 0.3s ease;
      text-decoration: none;
    }
    .back-icon:hover {
      background: rgba(0,0,0,0.7);
    }
    .content {
      padding: 2rem;
      display: flex;
      flex-direction: column;
    }
    .category-tag {
      align-self: flex-start;
      background: #000;
      color: var(--accent-cyan);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.8rem;
      margin-bottom: 1rem;
      box-shadow: 0 0 10px var(--accent-cyan), 0 0 20px var(--accent-cyan);
    }
    h1 {
      font-size: 2.8rem;
      color: #fff;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    .description {
      color: #ccc;
      font-size: 1.1rem;
      flex-grow: 1;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1.5rem;
    }
    .price {
      font-size: 2.2rem;
      font-weight: bold;
      color: var(--accent-cyan);
    }
    .btn-add {
      background: var(--purple);
      color: #fff;
      border: none;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
      transition: background 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn-add:hover {
      background: #a855f7; /* Lighter purple */
      box-shadow: 0 0 15px var(--purple);
    }
    .not-found {
      text-align: center;
      padding: 4rem;
    }
    @media (max-width: 768px) {
      .product-detail-card {
        grid-template-columns: 1fr;
      }
       h1 { font-size: 2rem; }
      .price { font-size: 1.8rem; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  private productId = signal(+this.route.snapshot.paramMap.get('id')!);

  public product = computed(() => this.productService.getProductById(this.productId()));

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
