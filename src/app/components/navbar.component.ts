import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
    <nav class="navbar">
      <div class="logo" routerLink="/">
        <span class="neon-text">GAME</span>SHOP
      </div>
      <div class="nav-links">
        <a routerLink="/" class="nav-link">Home</a>
        <a routerLink="/cart" class="nav-link cart-link">
          Cart
          @if (cartCount() > 0) {
            <span class="badge">{{ cartCount() }}</span>
          }
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: rgba(15, 15, 15, 0.8);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 255, 255, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      letter-spacing: 2px;
      color: #fff;
    }
    .neon-text {
      color: #00ffff;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    }
    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }
    .nav-link {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s ease;
      font-weight: 500;
    }
    .nav-link:hover {
      color: #00ffff;
    }
    .cart-link {
      position: relative;
    }
    .badge {
      position: absolute;
      top: -10px;
      right: -15px;
      background: #ff00ff;
      color: white;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(255, 0, 255, 0.5);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private cartService = inject(CartService);
  public cartCount = this.cartService.count;
}
