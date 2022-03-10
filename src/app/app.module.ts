import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OffersComponent } from './pages/offers/offers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';

export function initData(data: DataService) {
  return () => data.loadOffers()
}

@NgModule({
  declarations: [
    AppComponent,
    OffersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [DataService, { provide: APP_INITIALIZER, useFactory: initData, deps: [DataService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
