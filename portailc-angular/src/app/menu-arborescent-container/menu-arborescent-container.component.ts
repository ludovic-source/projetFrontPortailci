import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { EditionService } from '../services/edition.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-menu-arborescent-container',
  templateUrl: './menu-arborescent-container.component.html',
  styleUrls: ['./menu-arborescent-container.component.css']
})
export class MenuArborescentContainerComponent implements OnInit {
  indicateursEdition: any;
  indicateursEditionSubscription: Subscription;
  isModeParametrage = false;

  user: any;
  userSubscription: Subscription;
  themes: any[];
  themesSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private editionService: EditionService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {

    this.indicateursEditionSubscription = this.editionService.indicateursEditionSubject.subscribe(
      (indicateursEdition: any) => {
        this.indicateursEdition = indicateursEdition;
      });
    /*this.editionService.emitIndicateursEditionSubject();
    this.userSubscription = this.authService.userSubject.subscribe(
      (user: any) => {
        this.user = user;
      });
    this.authService.emitUserSubject();*/
    this.themesSubscription = this.themeService.themesSubject.subscribe(
      (themes: any[]) => {
        this.themes = themes;
      });
    this.themeService.emitThemesSubject();
  }

  getIsAuth() {
    return this.authService.getIsAuth();
  }

  getIsModeParametrage(): boolean {
    return this.isModeParametrage;
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

  editerThematique(lieuEdition: number) {
    this.editionService.setLieuEditionThematique(lieuEdition);
  }

  editerLien(lieuEdition: number) {
    this.editionService.revenirDebutFormulaire();
    this.editionService.setLieuEditionLien(lieuEdition);
  }
}
