import { Subject } from 'rxjs/Subject';
import { BehaviorSubject, Observable } from 'rxjs';

export class EditionService {

    indicateursEditionSubject = new Subject<any>();
    private indicateursEdition = {
                        lieuEdition: 0,
                        typeObjet: '',
                        isModeEdition: false,
                        isEdition: false,
                        typeModification: '',
                        niveauThematique: 0,
                        indicateurUpdate: false,
                        indicateurModifierThemeParent: false
    };

    emitIndicateursEditionSubject() {
        this.indicateursEditionSubject.next(this.indicateursEdition);
    }

    activerModeEdition() {
        this.indicateursEdition.isModeEdition = true;
        console.log('activation mode edition');
        this.emitIndicateursEditionSubject();
    }

    desactiverModeEdition() {
        this.indicateursEdition.isModeEdition = false;
        console.log('désactivation mode edition');
        this.revenirDebutFormulaire();
        this.emitIndicateursEditionSubject();
    }

  revenirDebutFormulaire() {
      this.indicateursEdition.typeObjet = '';
      this.indicateursEdition.isEdition = false;
      this.indicateursEdition.typeModification = '';
      //this.indicateursEdition.niveauThematiqueCreate = 0;
      //this.indicateursEdition.niveauThematiqueUpdate = 0;
      this.indicateursEdition.indicateurUpdate = false;
      this.indicateursEdition.indicateurModifierThemeParent = false;
      this.emitIndicateursEditionSubject();
  }

  setLieuEditionThematique(lieu: number) {
      this.indicateursEdition.lieuEdition = lieu;
      this.indicateursEdition.typeObjet = 'thematique';
      // lieu = 4 uniquement création de liens possibles et suppression sous sous-thème
      if (lieu == 1) {
          this.indicateursEdition.niveauThematique = 1;
      }
      if (lieu == 2) {
          this.indicateursEdition.niveauThematique = 2;
      }
      if (lieu == 3) {
          this.indicateursEdition.niveauThematique = 3;
      }
      if (lieu == 4) {
          this.indicateursEdition.niveauThematique = 4;
      }
      this.emitIndicateursEditionSubject();
  }

  setLieuEditionLien(lieu: number) {
      this.indicateursEdition.lieuEdition = lieu;
      this.indicateursEdition.typeObjet = 'lien';
      this.emitIndicateursEditionSubject();
  }

}
