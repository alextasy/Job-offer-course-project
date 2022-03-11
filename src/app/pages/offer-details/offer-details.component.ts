import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IJobOffer } from 'src/app/interfaces/job-offer.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  public offer: IJobOffer | undefined;
  public applyMessage = '';
  public postedByMe = false;

  constructor(
    public data: DataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params.id);
    this.offer = this.data.offers.find(offer => offer.id === id);
    const application = this.offer?.applied.find(user => user.id === this.data.currentUser?.id);
    if (application) this.applyMessage = application.message;

    if (this.offer?.postedById === this.data.currentUser?.id) this.postedByMe = true;
  }

  public getPostedBy(id: number): string {
    return this.data.users.find(user => user.id === id)?.name || '';
  }

  public applyDisabled(): boolean {
    return !this.data.currentUser || this.hasApplied();
  }

  public likeDisabled(): boolean {
    return !this.data.currentUser || this.offer?.postedById === this.data.currentUser.id;
  }

  public like(): void {
    if (!this.offer) return;
    this.offer.likedByUser = !this.offer.likedByUser;
    this.offer.numOfLikes += this.offer.likedByUser ? 1 : -1;
  }

  public apply(): void {
    //@ts-ignore
    this.offer?.applied.push({ id: this.data.currentUser?.id, message: this.applyMessage });
  }

  public hasApplied(): boolean {
    return Boolean(this.offer?.applied.some(user => user.id === this.data.currentUser?.id));
  }
}
