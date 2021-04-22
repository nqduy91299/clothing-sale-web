import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonElementsModule } from './views/common_elements/common-elements.module';
import { AdminModule } from './views/admin/admin.module';
import { ClientModule } from './views/client/client.module';

import { ToastrModule } from 'ngx-toastr';
const configToastr = {
  timeOut: 2700,
  positionClass: 'toast-bottom-left',
  preventDuplicates: true,
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonElementsModule,
    AdminModule,
    ClientModule,
    ToastrModule.forRoot(configToastr),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
