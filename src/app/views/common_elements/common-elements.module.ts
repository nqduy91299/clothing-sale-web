import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../../../mat-modules';
import { FavoriteListComponent } from './modals/favorite-list/favorite-list.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountContainerComponent } from './account-container/account-container.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    FavoriteListComponent,
    ItemCardComponent,
    ProfileComponent,
    AccountContainerComponent,
    AllOrdersComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule.forChild([])],
  exports: [
    NavBarComponent,
    FooterComponent,
    FavoriteListComponent,
    ItemCardComponent,
    ProfileComponent,
    AccountContainerComponent,
    AllOrdersComponent,
  ],
})
export class CommonElementsModule {}
