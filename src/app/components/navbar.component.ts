import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
    <nav class="navbar">
      <div class="logo" routerLink="/">
        <span class="neon-text">GAME</span>SHOP
      </div>
      
      <div class="nav-links">
        <a routerLink="/" class="nav-link"><i class="pi pi-home"></i> Home</a>
        
        <a routerLink="/cart" class="nav-link cart-link">
          <i class="pi pi-shopping-cart"></i> Cart
          @if (cartCount() > 0) {
            <span class="badge">{{ cartCount() }}</span>
          }
        </a>

        @if (isAuthenticated()) {
          <div class="user-menu">
            <a routerLink="/profile" class="profile-link">
              <img [src]="currentUser()?.avatar" [alt]="currentUser()?.username" class="avatar">
              <span class="username">{{ currentUser()?.username }}</span>
            </a>
            <button class="btn-icon" (click)="authService.logout()" title="Logout">
              <i class="pi pi-sign-out"></i>
            </button>
          </div>
        } @else {
          <a routerLink="/login" class="nav-link login-btn">
            <i class="pi pi-user"></i> Login
          </a>
        }
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
      display: flex;
      align-items: center;
      gap: 0.5rem;
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
    .login-btn {
      background: rgba(0, 255, 255, 0.1);
      padding: 6px 16px;
      border-radius: 20px;
      border: 1px solid rgba(0, 255, 255, 0.3);
    }
    .user-menu {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding-left: 1rem;
      border-left: 1px solid #333;
    }
    .profile-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .profile-link:hover {
      opacity: 0.8;
    }
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #00ffff;
    }
    .username {
      color: #fff;
      font-weight: 500;
      font-size: 0.9rem;
    }
    .btn-icon {
      background: none;
      border: none;
      color: #888;
      cursor: pointer;
      padding: 5px;
      border-radius: 4px;
      transition: all 0.2s;
    }
    .btn-icon:hover {
      color: #ff4444;
      background: rgba(255, 68, 68, 0.1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private cartService = inject(CartService);
  public authService = inject(AuthService);
  
  public cartCount = this.cartService.count;
  public isAuthenticated = this.authService.isAuthenticated;
  public currentUser = this.authService.currentUser;
}
