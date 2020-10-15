import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Utilisateur } from '../models/Utilisateur';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { mapTo } from 'rxjs-compat/operator/mapTo';
import { User } from '../models/User';
import { Profil } from '../models/Profil';

@Injectable()
export class UtilisateurService {

  // REPRESENTE LA SOURCE DE DONNEES UNIQUE DISTRIBUEE A TOUS LES COMPONENTS
  // Le BehaviorSubject va nous permettre de récupérer la valeur du Subject grâce à getValue()
  private _collaborateurSubject: BehaviorSubject<any> = new BehaviorSubject({});
  private _utilisateursSubject: BehaviorSubject<User[]> = new BehaviorSubject([]);

  // users$ est un Observable et peut être consommé par nos Components
  readonly collaborateur$: Observable<User> = this._collaborateurSubject.asObservable();
  readonly utilisateurs$: Observable<User[]> = this._utilisateursSubject.asObservable();

  private url = environment.API_URL + '/utilisateurs';

  constructor(private httpClient: HttpClient) {
  }

  getCollaborateurValue() {
    return this._collaborateurSubject.getValue();
  }
  setCollaborateurSubject(data) {
    this._collaborateurSubject.next(data);
  }

  getUtilisateursValue() {
    return this._utilisateursSubject.getValue();
  }
  setUtilisateursSubject(data) {
    this._utilisateursSubject.next(data);
  }

  getCollaborateurRefoByUid(uid: string): any {
    let options = {
      withCredentials: true
    };
    return this.httpClient.get(this.url + '/getRefogByUID/' + uid, options)
      .pipe(
        map((response: any) => response)
      )
      .toPromise()
      .then(
        (response: any) => {
          this._collaborateurSubject.next(response);
        });
  }

  getAllUtilisateurs(): any {
    let options = {
      withCredentials: true
    };
    this.httpClient
      .get<any>(this.url + '/get', options)
      .subscribe(
        (response) => {
          this.setUtilisateursSubject(response);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  createUtilisateur(utilisateur: Utilisateur): any {

    let options = {
      withCredentials: true
    };
    this.httpClient
      .post<any>(this.url + '/create', utilisateur, options)
      .subscribe(
        (response) => {
          console.log('création utilisateur OK');
          alert('Utilisateur ' + response.nom + ' créé');

          // On récupère la valeur de _utilisateursSubject
          let utilisateurs = this.getUtilisateursValue();

          // On y insère le nouvel utilisateur
          utilisateurs = [...utilisateurs, response];

          // On met à jour la vue en modifiant _utilisateursSubject
          this.setUtilisateursSubject(utilisateurs);

          return response;
        },
        (error) => {
          alert('utilisateur non créé');
          console.log('Erreur ! : ' + error);
        }
      );
  }

  updateUtilisateur(utilisateur: Utilisateur): any {
    let options = {
      withCredentials: true
    };
    this.httpClient
      .put<any>(this.url + '/update', utilisateur, options)
      .subscribe(
        (response) => {
          console.log('mise à jour utilisateur OK');

          let utilisateursAModifier = this.getUtilisateursValue();
          var index = 0;
          for (let utilisateur of utilisateursAModifier) {
            if (utilisateur.id == response.id) {
              utilisateursAModifier[index] = response;
            }
            index = index + 1;
          }
          this.setUtilisateursSubject(utilisateursAModifier);
          return response;
        },
        (error) => {
          alert('utilisateur non mis à jour');
          console.log('Erreur ! : ' + error);

        }
      );
  }

  deleteUtilisateur(utilisateur: Utilisateur): any {
    let options = {
      withCredentials: true
    };
    this.httpClient
      .delete(this.url + '/delete/' + utilisateur.id, options)
      .subscribe(
        (response) => {
          console.log('suppression utilisateur OK');
          alert('utilisateur ' + utilisateur.nom + ' supprimé');

          let userToRemove = this.getUtilisateursValue().find(user => user.id == utilisateur.id);
          let indexToRemove = this.getUtilisateursValue().indexOf(userToRemove);

          // On supprime l'élément du tableau
          this.getUtilisateursValue().splice(indexToRemove, 1);
          // On met à jour la vue
          this._utilisateursSubject.next(this.getUtilisateursValue());

        },
        (error) => {
          if (error == 'OK') {
            console.log('suppression utilisateur OK');
            alert('utilisateur ' + utilisateur.nom + ' supprimé');

            let userToRemove = this.getUtilisateursValue().find(user => user.id == utilisateur.id);
            let indexToRemove = this.getUtilisateursValue().indexOf(userToRemove);

            // On supprime l'élément du tableau
            this.getUtilisateursValue().splice(indexToRemove, 1);
            // On met à jour la vue
            this._utilisateursSubject.next(this.getUtilisateursValue());
          } else {
            alert('utilisateur non supprimé');
            console.log('Erreur ! : ' + error);
            return error;
          }
        }
      );
  }

  findIndexById(id: number): number {
    let index = -1;
    // On récupère la valeur de _utilisateursSubject
    let utilisateurs = this.getUtilisateursValue();
    // On cherche l'index de l'élément dans la collection
    for (let i = 0; i < utilisateurs.length; i++) {
      if (utilisateurs[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  mapToUtilisateur(user: User): Utilisateur {
    let utilisateur = new Utilisateur();
    utilisateur.id = user.id;
    utilisateur.nom = user.nom;
    utilisateur.prenom = user.prenom;
    utilisateur.uid = user.uid;
    utilisateur.uoAffectation = user.uoAffectation;
    utilisateur.siteExercice = user.siteExercice;
    utilisateur.fonction = user.fonction;
    utilisateur.profil = user.profil;

    return utilisateur;
  }


}
