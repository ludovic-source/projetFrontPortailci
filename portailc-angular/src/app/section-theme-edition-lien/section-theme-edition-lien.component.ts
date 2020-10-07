import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ThemeService } from '../services/theme.service';
import { LienService } from '../services/lien.service';
import { EditionService } from '../services/edition.service';
import { Thematique } from '../models/Thematique';
import { Lien } from '../models/Lien';

@Component({
  selector: 'app-section-theme-edition-lien',
  templateUrl: './section-theme-edition-lien.component.html',
  styleUrls: ['./section-theme-edition-lien.component.css']
})
export class SectionThemeEditionLienComponent implements OnInit {

  indicateursEdition: any;
  indicateursEditionSubscription: Subscription;

  typeModification: string;

  allThematiques: any[];
  allThematiquesSubscription: Subscription;

  idThematiqueNiveau1: any;
  idThematiqueNiveau2: any;
  thematiquesNiveau2: any[];
  thematiquesNiveau3: any[];

  lienUpdate: Lien;

  liens: any[];
  liensSubscription: Subscription;

  liensNiveau2: any[];
  liensNiveau2Subscription: Subscription;

  themes : any[];
  themesSubscription : Subscription;

  themesNiveau2: any[];
  themesNiveau2Subscription : Subscription;

  themesNiveau3: any[];
  themesNiveau3Subscription : Subscription;

  constructor(private themeService: ThemeService,
              private lienService: LienService,
              private editionService: EditionService,
              private router: Router) { }

  ngOnInit(): void {
      this.indicateursEditionSubscription = this.editionService.indicateursEditionSubject.subscribe(
                        (indicateursEdition: any) => {
                                              this.indicateursEdition = indicateursEdition;
                                                    });
      this.editionService.emitIndicateursEditionSubject();
      this.allThematiquesSubscription = this.themeService.allThematiquesSubject.subscribe(
                        (allThematiques: any[]) => {
                                              this.allThematiques = allThematiques;
                                           });
      this.themeService.emitAllThematiquesSubject();
      this.liensSubscription = this.lienService.liensSubject.subscribe(
                       (liens: any[]) => {
                                            this.liens = liens;
                                         });
      this.lienService.emitLiensSubject();
      this.themesSubscription = this.themeService.themesSubject.subscribe(
                        (themes: any[]) => {
                                      this.themes = themes;
                                   });
      this.themeService.emitThemesSubject();
      this.liensNiveau2Subscription = this.lienService.liensNiveau2Subject.subscribe(
                      (liens: any[]) => {
                                            this.liensNiveau2 = liens;
                                         });
      this.lienService.emitLiensNiveau2Subject();
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
  }

  setTypeModification(typeModification: string) {
    this.indicateursEdition.typeModification = typeModification;
    this.editionService.emitIndicateursEditionSubject();
    this.recupererThematiqueNiveau1();
  }

  recupererThematiqueNiveau1() {
      this.allThematiques = this.themeService.getAllThematiques();
  }

  setThematiqueNiveau1(theme: any) {
      console.log('setThematiqueNiveau1 : ' + theme.id);
      this.idThematiqueNiveau1 = theme.id;
      this.thematiquesNiveau2 = [];
      this.thematiquesNiveau3 = [];
      for (let thematique of this.allThematiques) {
          if (thematique.idParent == theme.id) {
              console.log('setThematiqueNiveau1 - sous-theme : ' + thematique.nom);
              this.thematiquesNiveau2.push(thematique);
          }
      }
      this.getLiens(theme);
  }

  setThematiqueNiveau2(sousTheme: any) {
      if (sousTheme != undefined) {
          this.idThematiqueNiveau2 = sousTheme.id;
          this.thematiquesNiveau3 = [];
          for (let thematique of this.allThematiques) {
              if (thematique.idParent == sousTheme.id) {
                  this.thematiquesNiveau3.push(thematique);
              }
          }
          this.getLiens(sousTheme);
      }

  }

  createLien(form: NgForm) {
      console.log(form.value);
      const lien = new Lien;
      lien.nom = form.value['nom'];
      lien.description = form.value['description'];
      lien.url = form.value['url'];
      lien.mode_affichage = form.value['mode_affichage'];
      if (form.value['sous_sous_theme'] != undefined) {
          lien.thematique = form.value['sous_sous_theme'];
      }
      if (form.value['sous_theme'] != undefined) {
          lien.thematique = form.value['sous_theme'];
      }
      if (form.value['sous_theme'] == undefined && form.value['sous_sous_theme'] == undefined) {
          lien.thematique = form.value['theme'];
      }
      console.log('lien.thematique.nom : ' + lien.thematique.nom);

      var lienCreate: any;
      lienCreate = this.lienService.createLien(lien);
      this.editionService.revenirDebutFormulaire();
  }

  getLiens(thematique: any): any {
      this.liens = this.lienService.getLiens(thematique.id);
  }

  publierLien(form: NgForm) {
      var lien = new Lien;
      lien = form.value['lien'];
      this.lienService.publierLien(lien);
      this.editionService.revenirDebutFormulaire();
  }

  depublierLien(form: NgForm) {
      var lien = new Lien;
      lien = form.value['lien'];
      this.lienService.depublierLien(lien);
  }

  setUpdateLien(lien: Lien) {
      this.lienUpdate = lien;
      this.indicateursEdition.indicateurUpdate = true;
  }

  updateLien(form: NgForm) {
      console.log(form.value);
      var lien = new Lien;
      lien = form.value['lien'];
      lien.nom = form.value['nom'];
      lien.description = form.value['description'];
      lien.url = form.value['url'];
      lien.mode_affichage = form.value['mode_affichage'];

      if (this.indicateursEdition.indicateurModifierThemeParent == true) {
        if (form.value['sous_sous_theme_parent'] != '') {
            lien.thematique = form.value['sous_sous_theme_parent'];
        } else {
            if (form.value['sous_theme_parent'] != '') {
                lien.thematique = form.value['sous_theme_parent'];
            }
        }
        if (form.value['sous_sous_theme_parent'] == ''
            && form.value['sous_theme_parent'] == '') {
            lien.thematique = form.value['theme_parent'];
        }
      } else {
            if (form.value['theme'] != undefined) {
                lien.thematique = form.value['theme'];
            }
            if (form.value['sous_theme'] != undefined) {
                lien.thematique = form.value['sous_theme'];
            }
            if (form.value['sous_sous_theme'] != undefined) {
                lien.thematique = form.value['sous_sous_theme'];
            }
      }
      console.log('lien.thematique.nom : ' + lien.thematique.nom);

      this.lienService.updateLien(lien);
      this.editionService.revenirDebutFormulaire();
      this.lienUpdate = null;
  }

  setModifierThemeParent(valeur: boolean) {
      this.indicateursEdition.indicateurModifierThemeParent = valeur;
      this.editionService.emitIndicateursEditionSubject();
  }

}
