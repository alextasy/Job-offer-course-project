import { Injectable, OnInit } from '@angular/core';
import { IJobOffer } from '../interfaces/job-offer.interface';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public offers: IJobOffer[] = [];
  public users: IUser[] = [];
  public currentUser: IUser | undefined;

  constructor(private http: HttpClient ) {}

  public async loadData(): Promise<void> {
    this.offers = await this.http.get('../../assets/data/offers.json').toPromise() as IJobOffer[];
    this.users = await this.http.get('../../assets/data/users.json').toPromise() as IUser[];
    this.currentUser = this.users[1]
  }


}
