import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Profil } from '../models/Profil';
import { Utilisateur } from '../models/Utilisateur';
import { ProfilService } from '../services/profil.service';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-section-parametrage-utilisateur',
  templateUrl: './section-parametrage-utilisateur.component.html',
  styleUrls: ['./section-parametrage-utilisateur.component.css']
})
export class SectionParametrageUtilisateurComponent implements OnInit {

  typeModification = '';

  allProfils : any[];
  allProfilsSubscription : Subscription;

  allUtilisateurs : any[];
  allUtilisateursSubscription : Subscription;

  utilisateur: Utilisateur;
  indicateurUtilisateur = false;
  collaborateur: any;
  indicateurCollaborateur = false;

  allCollaborateurs: any[];

  constructor(private profilService: ProfilService, private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
      this.allProfilsSubscription = this.profilService.allProfilsSubject.subscribe(
                        (allProfils: any) => {
                                              this.allProfils = allProfils;
                                                    });
      this.profilService.emitAllProfilsSubject();
      this.profilService.getAllProfils();
      this.profilService.emitAllProfilsSubject();
      this.allUtilisateursSubscription = this.utilisateurService.allUtilisateursSubject.subscribe(
                        (allUtilisateurs: any) => {
                                              this.allUtilisateurs = allUtilisateurs;
                                                    });
      this.utilisateurService.emitAllUtilisateursSubject();
      this.utilisateurService.getAllUtilisateurs();
      this.utilisateurService.emitAllUtilisateursSubject();
      this.allCollaborateurs = this.utilisateurService.getAllCollaborateurs();
  }

  setTypeModification(typeModification: string) {
      this.typeModification = typeModification;
  }

  createUtilisateur(form: NgForm) {
      console.log(form.value);
      const utilisateur = new Utilisateur;
      utilisateur.uid = this.collaborateur.uid;

      utilisateur.motDePasse = form.value['password'];
      utilisateur.nom = this.collaborateur.nom;
      utilisateur.prenom = this.collaborateur.prenom;
      utilisateur.profil = form.value['profil'];
      utilisateur.uoAffectation = this.collaborateur.uoAffectation;
      utilisateur.siteExercice = 'test';
      utilisateur.fonction = 'test';

      this.utilisateurService.createUtilisateur(utilisateur);
      this.reinitialiserFormulaire();
  }

  setUtilisateur(utilisateur: any) {
      this.utilisateur = utilisateur;
      this.indicateurUtilisateur = true;
  }

  setCollaborateur(collaborateur: any) {
      this.collaborateur = collaborateur;
      this.indicateurCollaborateur = true;
  }

  updateUtilisateurProfil(form: NgForm) {
      console.log(form.value);
      var utilisateur = new Utilisateur;
      utilisateur = form.value['utilisateur'];
      //utilisateur.uid = form.value['uid'];
      //utilisateur.motDePasse = form.value['password'];
      //utilisateur.nom = form.value['nom'];
      //utilisateur.prenom = form.value['prenom'];
      utilisateur.profil = form.value['profil'];
      //utilisateur.uoAffectation = form.value['uoAffectation'];
      //utilisateur.siteExercice = 'test';
      //utilisateur.fonction = 'test';

      this.utilisateurService.updateUtilisateur(utilisateur);
      this.reinitialiserFormulaire();
  }

  updateUtilisateurPassword(form: NgForm) {
      console.log(form.value);
      var utilisateur = new Utilisateur;
      utilisateur = form.value['utilisateur'];
      utilisateur.motDePasse = form.value['password'];
      this.utilisateurService.updateUtilisateur(utilisateur);
      this.reinitialiserFormulaire();
  }


  deleteUtilisateur(form: NgForm) {
      console.log(form.value);
      const utilisateur = form.value['utilisateur'];
      this.utilisateurService.deleteUtilisateur(utilisateur);
      this.reinitialiserFormulaire();
  }

  reinitialiserFormulaire() {
      this.utilisateur = null;
      this.indicateurUtilisateur = false;
      this.collaborateur = null;
      this.indicateurCollaborateur = false;
      this.typeModification = '';
  }

}
