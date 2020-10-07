import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Profil } from '../models/Profil';
import { ProfilService } from '../services/profil.service';
import { DroitService } from '../services/droit.service';
import { Droit } from '../models/Droit';

@Component({
  selector: 'app-section-parametrage-profil',
  templateUrl: './section-parametrage-profil.component.html',
  styleUrls: ['./section-parametrage-profil.component.css']
})
export class SectionParametrageProfilComponent implements OnInit {

  typeModification = '';

  allProfils : any[];
  allProfilsSubscription : Subscription;

  allDroits : any[];
  allDroitsSubscription : Subscription;

  profil: Profil;
  indicateurProfil = false;

  constructor(private profilService: ProfilService, private droitService: DroitService) { }

  ngOnInit(): void {
      this.allProfilsSubscription = this.profilService.allProfilsSubject.subscribe(
                        (allProfils: any) => {
                                              this.allProfils = allProfils;
                                                    });
      this.profilService.emitAllProfilsSubject();
      this.profilService.getAllProfils();
      this.profilService.emitAllProfilsSubject();
      this.allDroitsSubscription = this.droitService.allDroitsSubject.subscribe(
                        (allDroits: any) => {
                                              this.allDroits = allDroits;
                                                    });
      this.droitService.emitAllDroitsSubject();
  }

  setTypeModification(typeModification: string) {
      this.typeModification = typeModification;
      this.droitService.getAllDroits();
      this.droitService.emitAllDroitsSubject();
  }

  createProfil(form: NgForm) {
      console.log(form.value);
      const nbreAllDroits = this.allDroits.length;
      var nbreDroitsVides = 0;
      const droitsProfil = [];
      const profil = new Profil;
      for (let droit of this.allDroits) {
          if (form.value[droit.nom] == '' || form.value[droit.nom] == false) {
              nbreDroitsVides += 1;
          } else {
              droitsProfil.push(droit);
          }
      }
      if (nbreDroitsVides == nbreAllDroits) {
          alert('veuillez cocher au moins un droit');
      } else {
          profil.nom = form.value['nom'];
          profil.description = form.value['description'];
          profil.droits = droitsProfil;
          this.profilService.createProfil(profil);
          this.reinitialiserFormulaire();
      }
  }

  setProfil(profil: any) {
      this.profil = profil;
      this.indicateurProfil = true;
  }

  updateProfil(form: NgForm) {
      console.log(form.value);
      const nbreAllDroits = this.allDroits.length;
      var nbreDroitsVides = 0;
      const droitsProfil = [];
      const profil = form.value['profil'];
      for (let droit of this.allDroits) {
          if (form.value[droit.nom] == '' || form.value[droit.nom] == false) {
              nbreDroitsVides += 1;
          } else {
              droitsProfil.push(droit);
          }
      }
      if (nbreDroitsVides == nbreAllDroits) {
          alert('veuillez cocher au moins un droit');
      } else {
          profil.nom = form.value['nom'];
          profil.description = form.value['description'];
          profil.droits = droitsProfil;
          this.profilService.updateProfil(profil);
          this.reinitialiserFormulaire();
      }
  }

  deleteProfil(form: NgForm) {
      console.log(form.value);
      const profil = form.value['profil'];
      this.profilService.deleteProfil(profil);
      this.reinitialiserFormulaire();
  }

  reinitialiserFormulaire() {
      this.profil = null;
      this.indicateurProfil = false;
      this.typeModification = '';
  }

}
