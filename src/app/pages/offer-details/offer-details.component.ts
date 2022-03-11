import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  public appliedUsers: any[] = [];
  public editMode = false;
  public duplicate: IJobOffer | undefined;
  private isNew = false;
  public editFailed = false;

  constructor(
    public data: DataService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.id === 'new') {
      this.isNew = true;
      this.postedByMe = true;
      this.offer = {
        id: this.data.offers[this.data.offers.length -1].id + 1,
        title: '',
        description: '',
        numOfLikes: 0,
        type: 'full-time',
        category: '',
        applied: [],
        //@ts-ignore
        postedById: this.data.currentUser.id,
      }
      this.editOffer();
      return;
    }

    const id = Number(this.route.snapshot.params.id);
    this.offer = this.data.offers.find(offer => offer.id === id);
    const application = this.offer?.applied.find(user => user.id === this.data.currentUser?.id);
    if (application) this.applyMessage = application.message;

    if (this.offer?.postedById === this.data.currentUser?.id) {
      this.postedByMe = true;
      this.appliedUsers = this.offer?.applied.map(applied => {
       return { ...this.data.users.find(user => applied.id === user.id), message: applied.message }
      }) || [];
    }
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

  public approve(id: number): void {
    if (this.offer?.acceptedUserId) delete this.offer.acceptedUserId;
    //@ts-ignore
    else this.offer?.acceptedUserId = id;
  }

  public openModal(content:any): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal'});
  }

  public deleteOffer(): void {
    this.modalService.dismissAll();
    this.data.offers = this.data.offers.filter(offer => offer.id !== this.offer?.id);
    this.router.navigate(['']);
    window.scroll(0, 0);
  }

  public editOffer(): void {
    if (!this.offer) return;

    this.editFailed = false;
    this.editMode = true;
    this.duplicate = { ...this.offer };
  }

  public saveOffer(): void {
    if (!this.offer || !this.duplicate) return;

    if (!this.duplicate.title || !this.duplicate.description || !this.duplicate.category) {
      this.editFailed = true;
      return;
    }

    this.offer.title = this.duplicate.title;
    this.offer.description = this.duplicate.description;
    this.offer.category = this.duplicate.category;
    this.offer.type = this.duplicate.type;
    this.editMode = false;
    this.editFailed = false;
    if (this.isNew) {
      this.isNew = false;
      this.data.offers.unshift(this.offer);
    }
  }
}
