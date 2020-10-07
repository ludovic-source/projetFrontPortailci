import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ThemeService } from '../services/theme.service';
import { LienService } from '../services/lien.service';
import { EditionService } from '../services/edition.service';
import { Thematique } from '../models/Thematique';

@Component({
  selector: 'app-section-theme-edition-thematique',
  templateUrl: './section-theme-edition-thematique.component.html',
  styleUrls: ['./section-theme-edition-thematique.component.css']
})

export class SectionThemeEditionThematiqueComponent implements OnInit {

  indicateursEdition: any;
  indicateursEditionSubscription: Subscription;

  idThematiqueNiveau1: any;
  idThematiqueNiveau2: any;
  thematiquesNiveau2: any[];
  thematiquesNiveau3: any[];

  allThematiques: any[];
  allThematiquesSubscription: Subscription;

  thematiqueUpdate: any;
  thematiqueUpdateN1: any;
  thematiqueUpdateN2: any;

  themes : any[];
  themesSubscription : Subscription;

  themesNiveau2: any[];
  themesNiveau2Subscription : Subscription;

  themesNiveau3: any[];
  themesNiveau3Subscription : Subscription;

  file;

  //messageReponseFormulaire: string;

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
      this.themesSubscription = this.themeService.themesSubject.subscribe(
                        (themes: any[]) => {
                                      this.themes = themes;
                                   });
      this.themeService.emitThemesSubject();
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

  ngOnChanges() {
  }

  setTypeModification(typeModification: string) {
    this.indicateursEdition.typeModification = typeModification;
    this.editionService.emitIndicateursEditionSubject();
    if (this.indicateursEdition.typeObjet == 'thematique') {
        this.recupererThematiqueNiveau1();
    }
  }

  recupererThematiqueNiveau1() {
      this.allThematiques = this.themeService.getAllThematiques();
  }

  setThematiqueNiveau1(idThematique: number) {
      console.log('setThematiqueNiveau1 : ' + idThematique);
      this.idThematiqueNiveau1 = idThematique;
      this.thematiquesNiveau2 = [];
      for (let thematique of this.allThematiques) {
          if (thematique.idParent == idThematique) {
              console.log('setThematiqueNiveau1 - sous-theme : ' + thematique.nom);
              this.thematiquesNiveau2.push(thematique);
          }
      }
  }

  setThematiqueNiveau2(idThematique: number) {
      this.idThematiqueNiveau2 = idThematique;
      this.thematiquesNiveau3 = [];
      for (let thematique of this.allThematiques) {
          if (thematique.idParent == idThematique) {
              this.thematiquesNiveau3.push(thematique);
          }
      }
  }

  setNiveauThematiqueCreate(niveau: number) {
      this.indicateursEdition.niveauThematique = niveau;
      this.editionService.emitIndicateursEditionSubject();
  }

  createThematique(form: NgForm) {
      console.log(form.value);
      const thematique = new Thematique;
      thematique.nom = form.value['nom'];
      thematique.description = form.value['description'];
      //thematique.niveau = form.value['niveau_thematique_create'];
      thematique.niveau = this.indicateursEdition.niveauThematique;
      if (thematique.niveau == 1) {
          thematique.idParent = 0;
          // reste à traiter les images pour les thèmes
      }
      if (thematique.niveau == 2) {
          thematique.idParent = form.value['theme'];
      }
      if (thematique.niveau == 3) {
          thematique.idParent = form.value['sous_theme'];
      }
      thematique.imagePath = '';
      var thematiqueCreate: any;
      thematiqueCreate = this.themeService.createThematique(thematique);
      this.editionService.revenirDebutFormulaire();
  }

  deleteThematique(form: NgForm) {
      console.log(form.value);
      var thematique = new Thematique;
      thematique = form.value['thematiqueDelete'];
      if (confirm('Souhaitez-vous supprimer la thématique ' + thematique.nom + ' ?')) {
          this.themeService.deleteThematique(thematique);
      } else {
          console.log('confirmation de suppression thématique négative');
      }
      this.editionService.revenirDebutFormulaire();
  }

  setUpdateThematique(thematique) {
      this.thematiqueUpdate = thematique;
      this.indicateursEdition.indicateurUpdate = true;
      if (this.thematiqueUpdate.niveau == 2) {
          for (let theme of this.allThematiques) {
              if (theme.id == this.thematiqueUpdate.idParent) {
                  this.thematiqueUpdateN1 = theme;
              }
          }
      }
      if (this.thematiqueUpdate.niveau == 3) {
          for (let theme of this.allThematiques) {
              if (theme.id == this.thematiqueUpdate.idParent) {
                  this.thematiqueUpdateN2 = theme;
              }
          }
          for (let theme of this.allThematiques) {
              if (theme.id == this.thematiqueUpdateN2.idParent) {
                  this.thematiqueUpdateN1 = theme;
              }
          }
      }
  }

  updateThematique(form: NgForm) {
      console.log(form.value);
      const thematique = new Thematique;
      thematique.id = this.thematiqueUpdate.id;
      thematique.nom = form.value['nom'];
      thematique.description = form.value['description'];
      thematique.idParent = this.thematiqueUpdate.idParent;
      thematique.niveau = this.thematiqueUpdate.niveau;

      if (thematique.niveau == 1) {
          thematique.idParent = 0;
      }

      // ATTENTION : si changement de niveau d'une thématique, il faut monter d'un cran les enfants
      // -----> IMPACT DU BACK
      // POUR LE MOMENT L'APPLICATION INTERDIT LE CHANGEMENT DE NIVEAU D'UNE THEMATIQUE

      if (this.indicateursEdition.indicateurModifierThemeParent == true
          && thematique.niveau == 2) {
          thematique.idParent = form.value['theme_parent'];
      }
      if (this.indicateursEdition.indicateurModifierThemeParent == true
          && thematique.niveau == 3) {
          thematique.idParent = form.value['sous_theme_parent'];
      }

      if (this.thematiqueUpdate.imagePath == null) {
          thematique.imagePath = '';
      } else {
          thematique.imagePath = this.thematiqueUpdate.imagePath;
      }

      var thematiqueUpdate: any;
      thematiqueUpdate = this.themeService.updateThematique(thematique);
      this.editionService.revenirDebutFormulaire();

  }

  setModifierThemeParent(valeur: boolean) {
      this.indicateursEdition.indicateurModifierThemeParent = valeur;
      this.editionService.emitIndicateursEditionSubject();
  }

  uploadThematique(form: NgForm) {
      console.log(form.value);
      var thematique = new Thematique;
      thematique = form.value['thematiqueUpload'];
      this.themeService.uploadImageTheme(thematique, this.file);
  }

  uploadFileChange(event) {
      this.file = event.target.files[0];
      console.log('image récupérée');
  }

}
