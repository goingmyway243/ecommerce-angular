import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ProductCardComponent } from '../components/product-card.component';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, FormsModule],
  template: `
    <div class="container">
      <header class="hero">
        <h1>Legendary Gear for <span class="highlight">True Gamers</span></h1>
        <p>Level up your experience with rare items from the multiverse.</p>
      </header>

      <section class="filters-bar">
        <div class="search-box">
          <i class="pi pi-search"></i>
          <input 
            type="text" 
            placeholder="Search items..." 
            [ngModel]="searchQuery()"
            (ngModelChange)="onSearch($event)"
          >
        </div>

        <div class="category-filters">
          @for (cat of categories(); track cat) {
            <button 
              [class.active]="selectedCategory() === cat"
              (click)="onSelectCategory(cat)"
            >
              {{ cat }}
            </button>
          }
        </div>
      </section>

      @if (products().length > 0) {
        <div class="product-grid">
          @for (product of products(); track product.id) {
            <app-product-card 
              [product]="product" 
              (addToCart)="onAddToCart($event)"
            />
          }
        </div>
      } @else {
        <div class="no-results">
          <i class="pi pi-exclamation-circle"></i>
          <p>No items found matching your search criteria.</p>
          <button class="reset-btn" (click)="resetFilters()">Reset Filters</button>
        </div>
      }
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
      font-size: 3.5rem;
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

    .filters-bar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 3rem;
      background: rgba(20, 20, 20, 0.5);
      padding: 2rem;
      border-radius: 16px;
      border: 1px solid rgba(0, 255, 255, 0.1);
    }

    .search-box {
      position: relative;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }
    .search-box i {
      position: absolute;
      left: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      color: #00ffff;
      font-size: 1.2rem;
    }
    .search-box input {
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid #333;
      padding: 1.25rem 1.5rem 1.25rem 3.5rem;
      border-radius: 30px;
      color: #fff;
      font-size: 1.1rem;
      transition: all 0.3s;
    }
    .search-box input:focus {
      outline: none;
      border-color: #00ffff;
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.15);
      background: rgba(0, 0, 0, 0.5);
    }

    .category-filters {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .category-filters button {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid #333;
      color: #ccc;
      padding: 0.6rem 1.5rem;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 500;
    }
    .category-filters button:hover {
      background: rgba(0, 255, 255, 0.1);
      color: #00ffff;
      border-color: #00ffff;
    }
    .category-filters button.active {
      background: #00ffff;
      color: #000;
      border-color: #00ffff;
      box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    .no-results {
      text-align: center;
      padding: 4rem;
      background: rgba(20, 20, 20, 0.5);
      border-radius: 16px;
      border: 1px dashed #444;
    }
    .no-results i {
      font-size: 3rem;
      color: #444;
      margin-bottom: 1rem;
    }
    .no-results p {
      margin-bottom: 1.5rem;
    }
    .reset-btn {
      background: none;
      border: 1px solid #00ffff;
      color: #00ffff;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .reset-btn:hover {
      background: rgba(0, 255, 255, 0.1);
    }

    @media (max-width: 768px) {
      h1 { font-size: 2.5rem; }
      .container { padding: 1rem; }
      .filters-bar { padding: 1.5rem 1rem; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  public products = this.productService.filteredProducts;
  public categories = this.productService.categories;
  public searchQuery = this.productService.searchQuery;
  public selectedCategory = this.productService.selectedCategory;

  onSearch(query: string) {
    this.productService.searchQuery.set(query);
  }

  onSelectCategory(category: string) {
    this.productService.selectedCategory.set(category);
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  resetFilters() {
    this.productService.searchQuery.set('');
    this.productService.selectedCategory.set('All');
  }
}
