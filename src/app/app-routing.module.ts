import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRoutingModule } from './views/admin/admin-routing.module';
import { ClientRoutingModule } from './views/client/client-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [
    AdminRoutingModule,
    ClientRoutingModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
