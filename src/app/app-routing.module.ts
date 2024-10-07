import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/tab1.module').then((m) => m.Tab1PageModule),
  },
  {
    path: 'crearcuenta',
    loadChildren: () => import('./register/tab2.module').then((m) => m.Tab2PageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/tab11.module').then((m) => m.Tab11PageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
