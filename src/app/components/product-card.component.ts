import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  template: `
    <div class="card">
      <div class="image-container">
        <img [src]="product().imageUrl" [alt]="product().name">
        <span class="category-tag">{{ product().category }}</span>
      </div>
      <div class="content">
        <h3>{{ product().name }}</h3>
        <p>{{ product().description }}</p>
        <div class="footer">
          <span class="price">{{ product().price | currency }}</span>
          <button class="btn-add" (click)="addToCart.emit(product())"><i class="pi pi-cart-plus"></i> Add to Cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: rgba(30, 30, 30, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 255, 255, 0.1);
      border-color: rgba(0, 255, 255, 0.2);
    }
    .image-container {
      position: relative;
      width: 100%;
      padding-top: 75%;
      background: #111;
    }
    .image-container img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .category-tag {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: #00ffff;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.7rem;
      border: 1px solid rgba(0, 255, 255, 0.3);
    }
    .content {
      padding: 1.25rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    h3 {
      margin: 0 0 0.5rem 0;
      color: #fff;
      font-size: 1.1rem;
    }
    p {
      color: #aaa;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
      line-height: 1.4;
      flex-grow: 1;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
      font-weight: bold;
      color: #00ffff;
    }
    .btn-add {
      background: linear-gradient(135deg, #00ffff, #0088ff);
      color: #000;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn-add:hover {
      transform: scale(1.05);
      box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();
}
