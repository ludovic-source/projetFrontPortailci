import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../services/auth.service';
import { EditionService } from '../services/edition.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  indicateursEdition: any;
  indicateursEditionSubscription: Subscription;
  isModeParametrage = false;


  constructor(
    private authService: AuthService,
    private editionService: EditionService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.indicateursEditionSubscription = this.editionService.indicateursEditionSubject.subscribe(
      (indicateursEdition: any) => {
        this.indicateursEdition = indicateursEdition;
      });
    this.editionService.emitIndicateursEditionSubject();
  }

  getIsEditable() {
    let isEditable = this.editionService.getIsEditableSubjectValue();
    if (isEditable) {
      return true;
    } else {
      return false;
    }

  }

  getIsAuth() {
    return this.authService.getIsAuth();
  }

  getUsername() {
    return this.authService.getUsername()
  }

  onSignOut() {
    // Plus besoin, on peut gérer avec le routing
    //this.isModeParametrage = false;
    this.editionService.desactiverModeEdition();
    this.authService.signOut();
  }
  controleDroitUser(droit: string): boolean {
    return this.authService.controleDroitUser(droit);
  }
  activerModeEdition() {
    // Plus besoin, on peut gérer avec le routing
    //this.isModeParametrage = false;
    this.editionService.activerModeEdition();
  }

  desactiverModeEdition() {
    this.editionService.desactiverModeEdition();
  }

  getIsModeParametrage(): boolean {
    return this.isModeParametrage;
  }

  activerModeParametrage() {
    this.isModeParametrage = true;
    this.editionService.desactiverModeEdition();
  }

  desactiverModeParametrage() {
    this.isModeParametrage = false;

    this.router.navigate(['/theme']);
  }
  onAdmin() {
    this.router.navigate(['/admin']);
  }
  toWelcomePage() {
    this.editionService.desactiverModeEdition();
    this.router.navigate(['/navigation']);
  }

  isInWelcomePage() {
    if (this.router.url.match('navigation')) {
      return true;
    } else {
      return false;
    }
  }
}
