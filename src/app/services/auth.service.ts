import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  
  // State using signals
  private _currentUser = signal<User | null>(null);
  
  // Publicly exposed signals
  public currentUser = this._currentUser.asReadonly();
  public isAuthenticated = computed(() => !!this._currentUser());

  constructor() {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('gameshop_user');
    if (savedUser) {
      this._currentUser.set(JSON.parse(savedUser));
    }
  }

  login(username: string) {
    // Mock login logic
    const mockUser: User = {
      id: '1',
      username: username,
      email: `${username.toLowerCase()}@example.com`,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + username
    };

    this._currentUser.set(mockUser);
    localStorage.setItem('gameshop_user', JSON.stringify(mockUser));
    this.router.navigate(['/']);
  }

  logout() {
    this._currentUser.set(null);
    localStorage.removeItem('gameshop_user');
    this.router.navigate(['/login']);
  }
}
