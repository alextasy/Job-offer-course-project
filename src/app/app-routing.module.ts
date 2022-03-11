import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferDetailsComponent } from './pages/offer-details/offer-details.component';
import { OffersComponent } from './pages/offers/offers.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';

const routes: Routes = [
   { path: '', component: OffersComponent },
   { path: 'details/:id', component: OfferDetailsComponent },
   { path: 'usersettings', component: UserSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
