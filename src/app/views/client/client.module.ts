import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonElementsModule } from '../common_elements/common-elements.module';
import { ClientContainerComponent } from './client-container/client-container.component';
import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './home/home.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

@NgModule({
  declarations: [ClientContainerComponent, HomeComponent, ItemDetailComponent],
  imports: [CommonModule, ClientRoutingModule, CommonElementsModule],
  exports: [HomeComponent, ClientContainerComponent, ClientRoutingModule],
})
export class ClientModule {}
