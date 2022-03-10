import { Injectable, OnInit } from '@angular/core';
import { IJobOffer } from '../interfaces/job-offer.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public offers: IJobOffer[] = [];

  constructor(private http: HttpClient ) {}

  public async loadOffers(): Promise<void> {
    this.offers = await this.http.get('../../assets/data/offers.json').toPromise() as IJobOffer[];
  }


}
