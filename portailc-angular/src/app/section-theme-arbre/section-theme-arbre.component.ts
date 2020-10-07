import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';
import { LienService } from '../services/lien.service';
import { EditionService } from '../services/edition.service';

@Component({
  selector: 'app-section-theme-arbre',
  templateUrl: './section-theme-arbre.component.html',
  styleUrls: ['./section-theme-arbre.component.css']
})
export class SectionThemeArbreComponent implements OnInit {

  @Input() idTheme: number;

  idThemeNiveauOuvert: number;

  themesNiveau2: any[];
  themesNiveau2Subscription : Subscription;

  themesNiveau3: any[];
  themesNiveau3Subscription : Subscription;

  liensNiveau1: any[];
  liensNiveau1Subscription: Subscription;

  liensNiveau2: any[];
  liensNiveau2Subscription: Subscription;

  liens: any[];
  liensSubscription: Subscription;

  indicateursEdition: any;
  indicateursEditionSubscription: Subscription;

  isEditionTheme = false;
  isEditionLien = true;

  constructor(private authService: AuthService,
              private themeService: ThemeService,
              private lienService: LienService,
              private editionService: EditionService) { }

  ngOnInit(): void {
      this.themesNiveau2Subscription = this.themeService.themesNiveau2Subject.subscribe(
                      (themes: any[]) => {
                                            this.themesNiveau2 = themes;
                                         });
      this.themeService.emitThemesNiveau2Subject();
      this.themesNiveau3Subscription = this.themeService.themesNiveau3Subject.subscribe(
                      (themes: any[]) => {
                                            this.themesNiveau3 = themes;
                                         });
      this.themeService.emitThemesNiveau3Subject();
      this.liensNiveau1Subscription = this.lienService.liensNiveau1Subject.subscribe(
                      (liens: any[]) => {
                                            this.liensNiveau1 = liens;
                                         });
      this.lienService.emitLiensNiveau1Subject();
      this.liensNiveau2Subscription = this.lienService.liensNiveau2Subject.subscribe(
                      (liens: any[]) => {
                                            this.liensNiveau2 = liens;
                                         });
      this.lienService.emitLiensNiveau2Subject();
      this.liensSubscription = this.lienService.liensSubject.subscribe(
                       (liens: any[]) => {
                                            this.liens = liens;
                                         });
      this.lienService.emitLiensSubject();
      this.indicateursEditionSubscription = this.editionService.indicateursEditionSubject.subscribe(
                        (indicateursEdition: any) => {
                                              this.indicateursEdition = indicateursEdition;
                                                    });
      this.editionService.emitIndicateursEditionSubject();
  }

  ngOnChanges(): void {
      this.constructionArbre().then(() => console.log('résolution promise OK'));
  }

  getIsAuth() {
      return this.authService.getIsAuth();
  }

  getIdTheme() {
      return this.idTheme;
  }

  async constructionArbre() {
      console.log('section-theme / idTheme : ' + this.idTheme);
      this.themesNiveau2 = await this.recuperationThematiquesNiveau2();
      // récupération des liens directements rattachés au thème niveau 1
      this.liensNiveau1 = await this.recuperationLiensNiveau1();
  }

  recuperationThematiquesNiveau2() {
      console.log('section-theme / idTheme : ' + this.idTheme);
      return Promise.resolve(this.themeService.getThemesNiveau2(this.idTheme));
  }

  getThemesNiveau3EtLiens(idThemeNiveau2: number) {
      this.idThemeNiveauOuvert = idThemeNiveau2;
      console.log('section-theme / idTheme : ' + idThemeNiveau2);
      this.themesNiveau3 = this.themeService.getThemesNiveau3(idThemeNiveau2);
      this.liensNiveau2 = this.lienService.getLiensNiveau2(idThemeNiveau2);
  }

  recuperationLiensNiveau1() {
      return Promise.resolve(this.lienService.getLiensNiveau1(this.idTheme));
  }

  getLiensNiveau2() {
      return Promise.resolve(this.lienService.getLiensNiveau2(this.idTheme));
  }

  getLiens(idTheme: number) {
      this.idThemeNiveauOuvert = idTheme;
      console.log('getLiens avec idTheme =  ' + idTheme);
      this.liens = this.lienService.getLiens(idTheme);
  }

  editerThematique(lieuEdition: number) {
      this.indicateursEdition.isEdition = true;
      this.editionService.setLieuEditionThematique(lieuEdition);
      this.editionService.emitIndicateursEditionSubject();
  }

  editerLien(lieuEdition: number) {
      this.editionService.revenirDebutFormulaire();
      this.indicateursEdition.isEdition = true;
      this.editionService.setLieuEditionLien(lieuEdition);
      this.editionService.emitIndicateursEditionSubject();
  }

}
