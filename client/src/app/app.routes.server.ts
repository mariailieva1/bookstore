import { RenderMode, ServerRoute } from '@angular/ssr';

// Add route paths for SSR
const SSR = [
  '',
  'product/:id',
  'category/:id',
  'author/:id',
  'publisher/:id',
  'profile',
  'cart',
];

// Add route paths for SSG
const SSG = ['not-found', 'login', 'register'];

// Add route paths for CSR
const CSR = ['success', 'cancel', '**'];

export const serverRoutes: ServerRoute[] = [
  // Server Side Rendering
  ...(SSR.map((path) => ({
    path,
    renderMode: RenderMode.Server,
  })) as ServerRoute[]),

  // Static Site Generation
  ...(SSG.map((path) => ({
    path,
    renderMode: RenderMode.Prerender,
  })) as ServerRoute[]),

  // Client Side Rendering
  ...(CSR.map((path) => ({
    path,
    renderMode: RenderMode.Client,
  })) as ServerRoute[]),
];
