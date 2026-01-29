import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  template: `
    <div class="container">
      <h1>Your <span class="highlight">Inventory</span></h1>

      @if (items().length > 0) {
        <div class="cart-layout">
          <div class="items-list">
            @for (item of items(); track item.id) {
              <div class="cart-item">
                <img [src]="item.imageUrl" [alt]="item.name">
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p class="category">{{ item.category }}</p>
                </div>
                <div class="quantity-controls">
                  <button (click)="cartService.updateQuantity(item.id, item.quantity - 1)"><i class="pi pi-minus"></i></button>
                  <span>{{ item.quantity }}</span>
                  <button (click)="cartService.updateQuantity(item.id, item.quantity + 1)"><i class="pi pi-plus"></i></button>
                </div>
                <div class="price">
                  {{ (item.price * item.quantity) | currency }}
                </div>
                <button class="btn-remove" (click)="cartService.removeFromCart(item.id)"><i class="pi pi-trash"></i></button>
              </div>
            }
          </div>

          <div class="summary">
            <h2>Order Summary</h2>
            <div class="summary-row">
              <span>Items</span>
              <span>{{ cartCount() }}</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>{{ cartTotal() | currency }}</span>
            </div>
            <button class="btn-checkout" (click)="checkout()">
              <i class="pi pi-credit-card"></i> PROCEED TO CHECKOUT
            </button>
            <button class="btn-clear" (click)="cartService.clearCart()">
              <i class="pi pi-trash"></i> Clear Inventory
            </button>
          </div>
        </div>
      } @else {
        <div class="empty-state">
          <div class="icon"><i class="pi pi-shopping-cart"></i></div>
          <p>Your inventory is empty. Ready to loot some gear?</p>
          <a routerLink="/" class="btn-shop">
            <i class="pi pi-shopping-bag"></i> Back to Shop
          </a>
        </div>
      }
    </div>
  `,
  styles: [`
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 {
      margin-bottom: 2rem;
      color: #fff;
    }
    .highlight { color: #ff00ff; }

    .cart-layout {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 2rem;
    }

    .items-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-item {
      display: flex;
      align-items: center;
      background: rgba(30, 30, 30, 0.5);
      padding: 1rem;
      border-radius: 8px;
      gap: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .cart-item img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
    }

    .item-info { flex-grow: 1; }
    .item-info h3 { margin: 0 0 4px 0; color: #fff; }
    .category { color: #777; font-size: 0.8rem; margin: 0; }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: #000;
      padding: 4px 12px;
      border-radius: 20px;
    }

    .quantity-controls button {
      background: none;
      border: none;
      color: #00ffff;
      font-size: 0.9rem;
      cursor: pointer;
      padding: 0 5px;
    }

    .price {
      font-weight: bold;
      color: #fff;
      min-width: 80px;
      text-align: right;
    }

    .btn-remove {
      background: none;
      border: none;
      color: #555;
      font-size: 1.2rem;
      cursor: pointer;
      transition: color 0.2s;
    }
    .btn-remove:hover { color: #ff4444; }

    .summary {
      background: rgba(20, 20, 20, 0.8);
      padding: 1.5rem;
      border-radius: 12px;
      height: fit-content;
      border: 1px solid rgba(255, 0, 255, 0.1);
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      color: #ccc;
    }

    .total {
      border-top: 1px solid #333;
      padding-top: 1rem;
      font-size: 1.25rem;
      font-weight: bold;
      color: #fff;
    }

    .btn-checkout, .btn-clear, .btn-shop {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      width: 100%;
      border: none;
      padding: 12px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 1rem;
      transition: all 0.3s ease;
    }

    .btn-checkout {
      background: linear-gradient(135deg, #ff00ff, #aa00ff);
      color: #fff;
      letter-spacing: 1px;
    }
    .btn-checkout:hover { transform: scale(1.02); box-shadow: 0 0 15px rgba(255, 0, 255, 0.5); }

    .btn-clear {
      background: transparent;
      color: #777;
      border: 1px solid #333;
      font-size: 0.8rem;
    }
    .btn-clear:hover { background: #222; color: #999; }

    .empty-state {
      text-align: center;
      padding: 5rem 0;
    }

    .empty-state .icon { font-size: 4rem; margin-bottom: 1rem; opacity: 0.3; color: #00ffff; }
    .empty-state p { color: #666; font-size: 1.2rem; margin-bottom: 2rem; }

    .btn-shop {
      background: #00ffff;
      color: #000;
      text-decoration: none;
    }
    .btn-shop:hover { background: #fff; transform: scale(1.02); }

    @media (max-width: 768px) {
      .cart-layout { grid-template-columns: 1fr; }
      .cart-item { flex-wrap: wrap; }
      .quantity-controls { order: 3; }
      .price { order: 4; flex-grow: 1; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  public cartService = inject(CartService);
  public items = this.cartService.items;
  public cartCount = this.cartService.count;
  public cartTotal = this.cartService.total;

  checkout() {
    alert('Thank you for your purchase! Your gear is being delivered to your digital vault.');
    this.cartService.clearCart();
  }
}
