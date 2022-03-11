import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferDetailsComponent } from './pages/offer-details/offer-details.component';
import { OffersComponent } from './pages/offers/offers.component';

const routes: Routes = [
   { path: '', component: OffersComponent },
   { path: 'details/:id', component: OfferDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
