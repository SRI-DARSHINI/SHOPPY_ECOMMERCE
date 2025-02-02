import { Routes } from '@angular/router';
import { CartPage } from './cart/cart.page';
export const routes: Routes = [
  {
    path: 'cart',
    component: CartPage,
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  // {
  //   path: 'cart',
  //   loadComponent: () => import('./cart/cart.page').then( m => m.CartPage)
  // },
  // {
  //   path: 'history',
  //   loadComponent: () => import('./history/history.page').then( m => m.HistoryPage)
  // },
  {
    path: 'review',
    loadComponent: () => import('./review/review.page').then( m => m.ReviewPage)
  },
  
];