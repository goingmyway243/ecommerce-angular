import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ProductCardComponent } from '../components/product-card.component';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  template: `
    <div class="container">
      <header class="hero">
        <h1>Legendary Gear for <span class="highlight">True Gamers</span></h1>
        <p>Level up your experience with rare items from the multiverse.</p>
      </header>

      <div class="product-grid">
        @for (product of products(); track product.id) {
          <app-product-card 
            [product]="product" 
            (addToCart)="onAddToCart($event)"
          />
        }
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .hero {
      text-align: center;
      margin-bottom: 3rem;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #fff;
    }
    .highlight {
      color: #00ffff;
      text-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
    }
    p {
      color: #888;
      font-size: 1.2rem;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }
    @media (max-width: 768px) {
      h1 { font-size: 2rem; }
      .container { padding: 1rem; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  public products = this.productService.allProducts;

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
