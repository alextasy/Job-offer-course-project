import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IJobOffer } from 'src/app/interfaces/job-offer.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  public user: IUser | undefined;
  public editMode = false;
  public editFailed = false;
  public duplicate: IUser | undefined;
  public offers: IJobOffer[] = [];

  constructor(
    private data: DataService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.data.currentUser;
    if (this.user?.type === 'company') this.offers = this.data.offers.filter(offer => offer.postedById === this.user?.id);
    else this.offers = this.data.offers.filter(offer => {
      return offer.applied.some(user => user.id === this.user?.id);
    });
  }

  public openModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal'});
  }

  public deleteAccount(): void {
    this.modalService.dismissAll();
    this.router.navigate(['']);
    if (this.user?.type === 'company') this.data.offers = this.data.offers.filter(offer => offer.postedById !== this.user?.id);
    this.data.users = this.data.users.filter(user => user.id !== this.user?.id);
    this.data.currentUser = undefined;
  }

  public editAccount(): void {
    if (!this.user) return;

    this.editFailed = false;
    this.editMode = true;
    this.duplicate = { ...this.user };
  }

  public saveAccount(): void {
    if (!this.user || !this.duplicate) return;

    if (!this.duplicate.name || !this.duplicate.password) {
      this.editFailed = true;
      return;
    }

    this.user.name = this.duplicate.name;
    this.user.password = this.duplicate.password;
    this.editFailed = false;
  }
}
