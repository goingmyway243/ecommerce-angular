import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped';
  items: string[];
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <div class="profile-grid">
        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="profile-card mini">
            <div class="avatar-container">
              <img [src]="currentUser()?.avatar" [alt]="currentUser()?.username" class="avatar">
              <button class="edit-avatar-btn"><i class="pi pi-pencil"></i></button>
            </div>
            <h3>{{ currentUser()?.username }}</h3>
            <p class="email">{{ currentUser()?.email }}</p>
            <div class="stats">
              <div class="stat-item">
                <span class="label">Orders</span>
                <span class="value">{{ mockOrders.length }}</span>
              </div>
              <div class="stat-item">
                <span class="label">Points</span>
                <span class="value">1,250</span>
              </div>
            </div>
          </div>

          <nav class="side-nav">
            <button [class.active]="activeTab() === 'overview'" (click)="activeTab.set('overview')">
              <i class="pi pi-user"></i> Overview
            </button>
            <button [class.active]="activeTab() === 'orders'" (click)="activeTab.set('orders')">
              <i class="pi pi-shopping-bag"></i> Order History
            </button>
            <button [class.active]="activeTab() === 'settings'" (click)="activeTab.set('settings')">
              <i class="pi pi-cog"></i> Settings
            </button>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
          @if (activeTab() === 'overview') {
            <section class="tab-pane">
              <h2>Account Overview</h2>
              <div class="info-grid">
                <div class="info-card">
                  <label>Full Name</label>
                  <p>{{ currentUser()?.username }}</p>
                </div>
                <div class="info-card">
                  <label>Email Address</label>
                  <p>{{ currentUser()?.email }}</p>
                </div>
                <div class="info-card">
                  <label>Member Since</label>
                  <p>January 2024</p>
                </div>
                <div class="info-card">
                  <label>Account Status</label>
                  <p><span class="status-badge active">Verified</span></p>
                </div>
              </div>

              <h3>Recent Activity</h3>
              <div class="activity-list">
                <div class="activity-item">
                  <div class="icon-box purchase"><i class="pi pi-shopping-cart"></i></div>
                  <div class="activity-details">
                    <p>Purchased <strong>Elden Ring: Shadow of the Erdtree</strong></p>
                    <span>2 days ago</span>
                  </div>
                </div>
                <div class="activity-item">
                  <div class="icon-box achievement"><i class="pi pi-trophy"></i></div>
                  <div class="activity-details">
                    <p>Earned Achievement: <strong>Hardcore Gamer</strong></p>
                    <span>1 week ago</span>
                  </div>
                </div>
              </div>
            </section>
          }

          @if (activeTab() === 'orders') {
            <section class="tab-pane">
              <h2>Order History</h2>
              <div class="order-list">
                @for (order of mockOrders; track order.id) {
                  <div class="order-card">
                    <div class="order-header">
                      <div>
                        <span class="order-id">#{{ order.id }}</span>
                        <span class="order-date">{{ order.date }}</span>
                      </div>
                      <span class="order-status" [class]="order.status.toLowerCase()">{{ order.status }}</span>
                    </div>
                    <div class="order-body">
                      <p><strong>Items:</strong> {{ order.items.join(', ') }}</p>
                      <p class="total">Total: <span>\${{ order.total }}</span></p>
                    </div>
                  </div>
                }
              </div>
            </section>
          }

          @if (activeTab() === 'settings') {
            <section class="tab-pane">
              <h2>Profile Settings</h2>
              <form class="settings-form" (submit)="$event.preventDefault()">
                <div class="form-group">
                  <label>Username</label>
                  <input type="text" [value]="currentUser()?.username">
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" [value]="currentUser()?.email">
                </div>
                <div class="form-group">
                  <label>Notification Preferences</label>
                  <div class="checkbox-group">
                    <label><input type="checkbox" checked> Order updates</label>
                    <label><input type="checkbox" checked> Newsletter</label>
                    <label><input type="checkbox"> Promotional offers</label>
                  </div>
                </div>
                <button class="save-btn">Save Changes</button>
              </form>
            </section>
          }
        </main>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .profile-grid {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 2rem;
    }

    /* Sidebar */
    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .profile-card.mini {
      background: rgba(20, 20, 20, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 255, 255, 0.1);
      border-radius: 16px;
      padding: 2rem;
      text-align: center;
    }
    .avatar-container {
      position: relative;
      width: 100px;
      height: 100px;
      margin: 0 auto 1.5rem;
    }
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #00ffff;
      padding: 3px;
    }
    .edit-avatar-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #00ffff;
      color: #000;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      box-shadow: 0 4px 10px rgba(0, 255, 255, 0.3);
    }
    .email {
      color: #888;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    .stats {
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #333;
      padding-top: 1.5rem;
    }
    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .stat-item .label {
      font-size: 0.8rem;
      color: #666;
      text-transform: uppercase;
    }
    .stat-item .value {
      font-weight: bold;
      color: #00ffff;
    }

    .side-nav {
      background: rgba(20, 20, 20, 0.8);
      border: 1px solid rgba(0, 255, 255, 0.1);
      border-radius: 16px;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
    }
    .side-nav button {
      background: none;
      border: none;
      color: #ccc;
      padding: 1rem 1.5rem;
      text-align: left;
      cursor: pointer;
      border-radius: 10px;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1rem;
    }
    .side-nav button:hover {
      background: rgba(0, 255, 255, 0.05);
      color: #00ffff;
    }
    .side-nav button.active {
      background: rgba(0, 255, 255, 0.1);
      color: #00ffff;
      font-weight: bold;
    }

    /* Main Content */
    .main-content {
      background: rgba(20, 20, 20, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(0, 255, 255, 0.1);
      border-radius: 16px;
      padding: 2.5rem;
    }
    h2 {
      margin-top: 0;
      margin-bottom: 2rem;
      font-size: 1.8rem;
      border-left: 4px solid #00ffff;
      padding-left: 1rem;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    .info-card {
      background: rgba(255, 255, 255, 0.03);
      padding: 1.25rem;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .info-card label {
      display: block;
      color: #666;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
    }
    .info-card p {
      margin: 0;
      font-weight: 500;
    }
    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: bold;
    }
    .status-badge.active {
      background: rgba(0, 255, 0, 0.1);
      color: #00ff00;
      border: 1px solid rgba(0, 255, 0, 0.2);
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 12px;
    }
    .icon-box {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    .icon-box.purchase { background: rgba(0, 255, 255, 0.1); color: #00ffff; }
    .icon-box.achievement { background: rgba(255, 0, 255, 0.1); color: #ff00ff; }
    .activity-details p { margin: 0; font-size: 0.95rem; }
    .activity-details span { font-size: 0.8rem; color: #555; }

    /* Orders */
    .order-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .order-card {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .order-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #333;
    }
    .order-id { font-weight: bold; color: #00ffff; margin-right: 1rem; }
    .order-date { color: #666; font-size: 0.9rem; }
    .order-status {
      font-size: 0.8rem;
      padding: 2px 10px;
      border-radius: 10px;
      text-transform: uppercase;
    }
    .order-status.delivered { background: rgba(0, 255, 0, 0.1); color: #00ff00; }
    .order-status.processing { background: rgba(255, 255, 0, 0.1); color: #ffff00; }
    .order-body p { margin: 0.5rem 0; font-size: 0.9rem; }
    .total { margin-top: 1rem !important; }
    .total span { color: #00ffff; font-size: 1.2rem; font-weight: bold; }

    /* Settings Form */
    .settings-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .form-group label { color: #999; font-size: 0.9rem; }
    .form-group input[type="text"],
    .form-group input[type="email"] {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid #333;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      color: #fff;
      font-size: 1rem;
    }
    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }
    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #ccc;
      cursor: pointer;
    }
    .save-btn {
      background: #00ffff;
      color: #000;
      border: none;
      padding: 1rem;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 1rem;
      transition: all 0.3s;
    }
    .save-btn:hover {
      background: #00cccc;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
    }

    @media (max-width: 900px) {
      .profile-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;
  activeTab = signal<'overview' | 'orders' | 'settings'>('overview');

  mockOrders: Order[] = [
    {
      id: 'GS-8821',
      date: 'Oct 12, 2023',
      total: 59.99,
      status: 'Delivered',
      items: ['Cyberpunk 2077: Phantom Liberty']
    },
    {
      id: 'GS-7712',
      date: 'Sep 05, 2023',
      total: 129.98,
      status: 'Delivered',
      items: ['Starfield Premium Edition', 'Gaming Mouse Pad']
    },
    {
      id: 'GS-6601',
      date: 'Aug 20, 2023',
      total: 69.99,
      status: 'Delivered',
      items: ['Baldur\'s Gate 3']
    }
  ];
}
