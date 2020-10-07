import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';
import { EditionService } from './services/edition.service';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  indicateursEdition: any;
  indicateursEditionSubscription: Subscription;
  isModeParametrage = false;

  title = 'portailci';
  user: any;
  userSubscription : Subscription;
  themes : any[];
  themesSubscription : Subscription;

  constructor(private authService: AuthService,
              private editionService: EditionService,
              private themeService: ThemeService,
              private domSanitizer: DomSanitizer,
              private router: Router) { }

  ngOnInit() {
     this.indicateursEditionSubscription = this.editionService.indicateursEditionSubject.subscribe(
                        (indicateursEdition: any) => {
                                              this.indicateursEdition = indicateursEdition;
                                                    });
     this.editionService.emitIndicateursEditionSubject();
     this.userSubscription = this.authService.userSubject.subscribe(
                (user: any) => {
                                  this.user = user;
                               });
     this.authService.emitUserSubject();
     this.themesSubscription = this.themeService.themesSubject.subscribe(
                (themes: any[]) => {
                                      this.themes = themes;
                                   });
     this.themeService.emitThemesSubject();
  }

   ngOnDestroy() {
      this.themesSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
   }

   getIsAuth() {
      return this.authService.getIsAuth();
   }

   getUsername() {
      return this.authService.getUsername()
   }

   onSignOut() {
      this.isModeParametrage = false;
      this.editionService.desactiverModeEdition();
      this.authService.signOut();
   }

   controleDroitUser(droit: string): boolean {
      return this.authService.controleDroitUser(droit);
   }

   activerModeEdition() {
      this.isModeParametrage = false;
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
      this.router.navigate(['theme']);
   }

   editerThematique(lieuEdition: number) {
      this.editionService.setLieuEditionThematique(lieuEdition);
   }

   editerLien(lieuEdition: number) {
      this.editionService.revenirDebutFormulaire();
      this.editionService.setLieuEditionLien(lieuEdition);
   }

   getImage(idTheme: number) {

      //return this.domSanitizer.bypassSecurityTrustResourceUrl(window.localStorage.getItem('' + idTheme));

      return window.localStorage.getItem('' + idTheme);  // pour récupérer la vraie image du back-end
      // ci-dessous, juste pour les tests en attendant la mise en place du getImage()
/*
      if (idTheme == 1) {
          return 'icons8_f1_car_24px.png';
      }
      if (idTheme == 2) {
          return 'icons8_golf_cart_24px.png';
      }
      if (idTheme == 3) {
          return 'icons8_people_in_car_side_view_24px.png';
      }
      if (idTheme == 4) {
          return 'icons8_food_truck_24px.png';
      }
      if (idTheme == 5) {
          return 'icons8_tractor_24px.png';
      }
      if (idTheme == 36) {
          return 'icons8_rocket_24px.png';
      }
      return '';
*/
   }

}
