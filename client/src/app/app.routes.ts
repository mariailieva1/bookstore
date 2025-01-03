import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';
import { AuthorComponent } from './pages/author/author.component';
import { PublisherComponent } from './pages/publisher/publisher.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { adminGuard, authGuard } from './guards/auth.guard';
import { CartComponent } from './pages/cart/cart.component';
import { SuccessComponent } from './pages/success/success.component';
import { CancelComponent } from './pages/cancel/cancel.component';
import { AdminComponent } from './pages/admin/admin.component';
import { TagSelectionComponent } from './pages/tag-selection/tag-selection.component';

export const routes: Routes = [
  // Main
  { path: '', component: MainComponent },

  // Entity pages
  { path: 'product/:id', component: ProductComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'author/:id', component: AuthorComponent },
  { path: 'publisher/:id', component: PublisherComponent },

  // Authentication
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Profile
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

  // Cart
  { path: 'cart', component: CartComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'cancel', component: CancelComponent },

  // Admin
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },

  // Not found
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
