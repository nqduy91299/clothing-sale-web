import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../../../mat-modules';
import { FavoriteListComponent } from './modals/favorite-list/favorite-list.component';
import { ItemCardComponent } from './item-card/item-card.component';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    FavoriteListComponent,
    ItemCardComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    NavBarComponent,
    FooterComponent,
    FavoriteListComponent,
    ItemCardComponent,
    MaterialModule,
  ],
})
export class CommonElementsModule {}
