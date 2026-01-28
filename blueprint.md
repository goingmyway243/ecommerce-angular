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
- `src/app/pages/`: Main views (ProductList, Cart).

## Current Plan: Phase 1 - Foundation & Listing
1. Define `Product` model.
2. Create `CartService` to manage cart state with signals.
3. Create `ProductListComponent` and `ProductCardComponent`.
4. Implement `NavbarComponent`.
5. Set up basic routing.
