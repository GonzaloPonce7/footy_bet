import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Asegúrate de que la ruta sea correcta

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/tab1.module').then((m) => m.Tab1PageModule),
  },
  {
    path: 'apuesta',
    loadChildren: () => import('./apuestas/tab3.module').then((m) => m.Tab3PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user_apuesta/tab8.module').then((m) => m.Tab8PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crearcuenta',
    loadChildren: () => import('./register/tab2.module').then((m) => m.Tab2PageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/tab11.module').then((m) => m.Tab11PageModule),
    canActivate: [AuthGuard] 
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
