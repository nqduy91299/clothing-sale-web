import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientContainerComponent } from './client-container/client-container.component';
import { HomeComponent } from './home/home.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ClientContainerComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'product/:id',
        component: ItemDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
