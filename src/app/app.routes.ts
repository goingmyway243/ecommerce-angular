import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart.component').then(m => m.CartComponent)
  }
];
