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
  //utilisateurEdition: any;

  // pour la pagination
  nbreUtilisateursParPage = 2;
  nbreUtilisateurs: number;
  numeroPageEnCours: number;  

  constructor(private profilService: ProfilService, private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
      this.allProfilsSubscription = this.profilService.allProfilsSubject.subscribe(
                        (allProfils: any) => {
                                              this.allProfils = allProfils;
                                                    });
      this.profilService.emitAllProfilsSubject();
      this.profilService.getAllProfils();
      this.profilService.emitAllProfilsSubject();
      /*
      this.allUtilisateursSubscription = this.utilisateurService.allUtilisateursSubject.subscribe(
                        (allUtilisateurs: any) => {
                                              this.allUtilisateurs = allUtilisateurs;
                                                    });
      this.utilisateurService.emitAllUtilisateursSubject();
      */
      this.getAllUtilisateurs();
      this.utilisateurService.getAllUtilisateurs();
      this.utilisateurService.emitAllUtilisateursSubject();
      this.allCollaborateurs = this.utilisateurService.getAllCollaborateurs();      
      this.numeroPageEnCours = 1;   
  }

  async getAllUtilisateurs() {
    let response:any = await this.utilisateurService.getAllUtilisateursPromise();
    if (response) {
        this.allUtilisateurs = response;
        this.utilisateurService.emitAllUtilisateursSubject();
        this.nbreUtilisateurs = this.allUtilisateurs.length; 
    }    
  }

  setTypeModification(typeModification: string, utilisateur?:any) {
    this.typeModification = typeModification;  
    if (typeModification != 'create') {
        this.utilisateur = utilisateur;
      }      
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
      this.nbreUtilisateurs += 1;        
      this.numeroPageEnCours = 1;
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
      utilisateur = this.utilisateur;
      utilisateur.profil = form.value['profil'];

      this.utilisateurService.updateUtilisateur(utilisateur);
      this.reinitialiserFormulaire();
  }

  updateUtilisateurPassword(form: NgForm) {
      console.log(form.value);
      let utilisateur = new Utilisateur;
      utilisateur = this.utilisateur;
      utilisateur.motDePasse = form.value['password'];
      this.utilisateurService.updateUtilisateur(utilisateur);
      this.reinitialiserFormulaire();
  }


  supprimerUtilisateur(utilisateur) {
      if (confirm("souhaitez-vous supprimer l'utilisateur " + utilisateur.prenom + " " + utilisateur.nom + "?")) {
        console.log(utilisateur);
        this.utilisateurService.deleteUtilisateur(utilisateur);
        this.nbreUtilisateurs -= 1;
        this.numeroPageEnCours = 1;
      }   
  }

  reinitialiserFormulaire() {
      this.utilisateur = null;
      this.indicateurUtilisateur = false;
      this.collaborateur = null;
      this.indicateurCollaborateur = false;
      this.typeModification = '';
  }

  quitterFormulaire() {
      this.reinitialiserFormulaire();
  }

  afficherPage(numeroPage: number) {
    this.numeroPageEnCours = numeroPage;
  }

  afficherPageSuivante() {
    let nbrePagesMax = this.nbreUtilisateurs / this.nbreUtilisateursParPage;
    if (this.numeroPageEnCours < nbrePagesMax) {
        this.numeroPageEnCours += 1;
    }
  }

  afficherPagePrecedente() {
    if (this.numeroPageEnCours > 1) {
        this.numeroPageEnCours -= 1;
    }
  }

}
