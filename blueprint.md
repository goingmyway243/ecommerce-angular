# GameItems E-commerce App Blueprint

## Overview
A modern, fast, and visually appealing e-commerce application for purchasing rare game items (skins, weapons, power-ups). Built with Angular 20+, leveraging Signals for state management and Standalone Components for a lean architecture.

## Features & Design
- **Modern Gaming Aesthetic**: Dark theme with neon accents (cyan/purple), glassmorphism effects, and responsive layout.
- **Signal-based State**: Reactive cart management and product listing using Angular Signals.
- **Standalone Architecture**: 100% standalone components, no NgModules.
- **OnPush Change Detection**: Optimized performance across all components.
- **Native Control Flow**: Using `@if` and `@for` for clean templates.
- **Responsive Design**: Works on mobile and desktop.

## Project Structure
- `src/app/models/`: Interfaces (Product, CartItem).
- `src/app/services/`: Singleton services (ProductService, CartService).
- `src/app/components/`: Reusable UI components (Navbar, ProductCard).
- `src/app/pages/`: Main views (ProductList, Cart, ProductDetail).

## Current Plan: Phase 2 - Product Details & Enhanced UX
1. **Update `ProductService`**: Add method to fetch a single product by ID.
2. **Create `ProductDetailComponent`**: 
   - New page to show full details of a product.
   - Glassmorphism design for the product container.
   - "Add to Cart" functionality.
3. **Update Routing**: Add `/product/:id` route.
4. **Enhance Navigation**: Link `ProductCard` to the new Detail page.
5. **UI Polish**: Add smooth transitions and hover effects.
