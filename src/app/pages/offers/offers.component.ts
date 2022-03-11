import { Component, OnInit } from '@angular/core';
import { IJobOffer } from 'src/app/interfaces/job-offer.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  public offers: IJobOffer[] = [];

  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.offers = this.data.offers;
  }

  public getPostedBy(id: number): string {
    return this.data.users.find(user => user.id === id)?.name || '';
  }

  public isOverflown({ clientWidth, clientHeight, scrollWidth, scrollHeight }: HTMLDivElement): boolean {
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
  }
}
