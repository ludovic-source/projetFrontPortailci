﻿import { Profil } from './Profil';
import { Utilisateur } from './Utilisateur';

export class User {

  public id?: number;
  public uid?: string;
  public nom?: string;
  public prenom?: string;
  public uoAffectation?: string;
  public siteExercice?: string;
  public fonction?: string;
  public profil?: any;

  constructor(id?: number, uid?: string, nom?: string, prenom?: string, uoAffectation?: string, siteExercice?: string, fonction?: string, profil?: any) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.uid = uid;
    this.uoAffectation = uoAffectation;
    this.siteExercice = siteExercice;
    this.fonction = fonction;
    this.profil = profil;
  }

  getUID() {
    return this.uid;
  }

  mapToUtilisateur(): Utilisateur {
    let utilisateur: Utilisateur;
    utilisateur.id = this.id;
    utilisateur.nom = this.nom;
    utilisateur.prenom = this.prenom;
    utilisateur.uid = this.uid;
    utilisateur.uoAffectation = this.uoAffectation;
    utilisateur.siteExercice = this.siteExercice;
    utilisateur.fonction = this.fonction;
    utilisateur.profil = this.profil;

    return utilisateur;
  }

}

