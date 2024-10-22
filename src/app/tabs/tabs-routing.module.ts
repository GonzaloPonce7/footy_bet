import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab11',
        loadChildren: () => import('../home/tab11.module').then(m => m.Tab11PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../register/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab8',
        loadChildren: () => import('../user_apuesta/tab8.module').then(m => m.Tab8PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../apuestas/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
