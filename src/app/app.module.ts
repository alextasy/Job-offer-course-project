import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OffersComponent } from './pages/offers/offers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { OfferDetailsComponent } from './pages/offer-details/offer-details.component';
import { FormsModule } from '@angular/forms';

export function initData(data: DataService) {
  return () => data.loadData();
}

@NgModule({
  declarations: [
    AppComponent,
    OffersComponent,
    OfferDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [DataService, { provide: APP_INITIALIZER, useFactory: initData, deps: [DataService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
