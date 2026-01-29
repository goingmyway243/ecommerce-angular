import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <i class="pi pi-user-circle"></i>
          <h1>PLAYER <span class="highlight">LOGIN</span></h1>
          <p>Ready to jump back into the game?</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <div class="input-wrapper">
              <i class="pi pi-user"></i>
              <input 
                id="username" 
                type="text" 
                formControlName="username" 
                placeholder="Enter your gamer tag"
                autocomplete="username"
              >
            </div>
            @if (loginForm.get('username')?.touched && loginForm.get('username')?.errors?.['required']) {
              <small class="error-text">Gamer tag is required to start the mission.</small>
            }
          </div>

          <div class="form-group">
            <label for="password">Access Key</label>
            <div class="input-wrapper">
              <i class="pi pi-lock"></i>
              <input 
                id="password" 
                type="password" 
                formControlName="password" 
                placeholder="••••••••"
                autocomplete="current-password"
              >
            </div>
          </div>

          <button type="submit" [disabled]="loginForm.invalid || isLoading()" class="btn-login">
            @if (isLoading()) {
              <i class="pi pi-spin pi-spinner"></i> INITIALIZING...
            } @else {
              <i class="pi pi-sign-in"></i> LOGIN
            }
          </button>
        </form>

        <div class="login-footer">
          <p>New player? <a href="#">Create a new vault</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 2rem;
    }

    .login-card {
      background: rgba(20, 20, 20, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 255, 255, 0.1);
      border-radius: 20px;
      padding: 3rem;
      width: 100%;
      max-width: 450px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 255, 0.05);
    }

    .login-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .login-header i {
      font-size: 4rem;
      color: #00ffff;
      margin-bottom: 1rem;
      filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.5));
    }

    .login-header h1 {
      font-size: 2rem;
      margin: 0;
      letter-spacing: 2px;
    }

    .highlight { color: #ff00ff; }

    .login-header p {
      color: #888;
      margin-top: 0.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      color: #ccc;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-wrapper i {
      position: absolute;
      left: 1rem;
      color: #555;
    }

    input {
      width: 100%;
      background: #000;
      border: 1px solid #333;
      color: #fff;
      padding: 12px 12px 12px 3rem;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    input:focus {
      outline: none;
      border-color: #00ffff;
      box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
    }

    .error-text {
      color: #ff4444;
      font-size: 0.8rem;
      margin-top: 0.5rem;
      display: block;
    }

    .btn-login {
      width: 100%;
      background: linear-gradient(135deg, #00ffff, #0088ff);
      color: #000;
      border: none;
      padding: 14px;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-top: 2rem;
      transition: all 0.3s ease;
      letter-spacing: 1px;
    }

    .btn-login:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 255, 255, 0.4);
    }

    .btn-login:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .login-footer {
      text-align: center;
      margin-top: 2rem;
      color: #666;
    }

    .login-footer a {
      color: #ff00ff;
      text-decoration: none;
      font-weight: bold;
    }

    .login-footer a:hover {
      text-decoration: underline;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  
  public isLoading = signal(false);

  public loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      
      // Simulate API call
      setTimeout(() => {
        const username = this.loginForm.value.username as string;
        this.authService.login(username);
        this.isLoading.set(false);
      }, 1500);
    }
  }
}
