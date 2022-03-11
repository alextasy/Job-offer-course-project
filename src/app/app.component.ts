import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public errMessage = '';
  constructor(
    private modalService: NgbModal,
    public data: DataService,
  ) {}

  public openModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal'});
  }

  public signIn(email: string, password: string): any {
    if (!email) return this.errMessage = "Email is required!";
    if (!password) return this.errMessage = "Password is required!";
    const user = this.data.users.find(user => user.email === email && user.password === password);
    if (!user) return this.errMessage = "Wrong credentials!"

    this.data.currentUser = user;
    this.errMessage = '';
    this.modalService.dismissAll();
  }

  public signOut(): void {
    this.data.currentUser = undefined;
  }
}
