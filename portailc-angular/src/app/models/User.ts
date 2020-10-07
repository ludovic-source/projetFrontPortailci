﻿export class User {
  id: number;
  UID: string;
  nom: string;
  prenom: string;
  UOAffectation: string;
  siteExercice: string;
  fonction : string;
  profil : any;

  getUID() {
    return this.UID;
  }

}

