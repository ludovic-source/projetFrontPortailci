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
  readonly collaborateur$: Observable<User> =  this._collaborateurSubject.asObservable();
  readonly utilisateurs$: Observable<User[]> =  this._utilisateursSubject.asObservable();


  allUtilisateursSubject = new Subject<any[]>();
  private allUtilisateurs: any[];



  private collaborateursBDDF = [
    {
      uid: '100100',
      nom: 'Harden',
      prenom: 'James',
      uoAffectation: 'Houston Rockets'
    },
    {
      uid: 'A00100',
      nom: 'James',
      prenom: 'Lebron',
      uoAffectation: 'Los Angeles Lakers'
    },
    {
      uid: 'B00100',
      nom: 'Antetokoumpo',
      prenom: 'Gianis',
      uoAffectation: 'Milwaukee Bucks'
    },
    {
      uid: 'C00100',
      nom: 'Durant',
      prenom: 'Kevin',
      UOAffectation: 'Brooklyn Nets'
    },
    {
      uid: 'D00100',
      nom: 'Williamson',
      prenom: 'Zion',
      uoAffectation: 'New Orleans Pelicans'
    },
    {
      uid: 'E00100',
      nom: 'Davis',
      prenom: 'Antony',
      uoAffectation: 'Los Angeles Lakers'
    }];

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

  emitAllUtilisateursSubject() {
    this.allUtilisateursSubject.next(this.allUtilisateurs);
  }

  getAllCollaborateurs(): any[] {
    return this.collaborateursBDDF;
  }

  getCollaborateurRefoByUid(uid: string) {
    let options = {
      withCredentials: true
    };
    return this.httpClient.get(this.url + '/getRefogByUID/' + uid, options)
      .pipe(
        map((response: any) => response.data)
      )
      .toPromise()
      .then(
        (response: any) => {
          console.log(response);
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
          this.allUtilisateurs = response;
          console.log('récupération de tous les utilisateurs OK');
          this.emitAllUtilisateursSubject();

          //
          //console.log(response);
          this._utilisateursSubject.next(response);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  createUtilisateur(utilisateur: Utilisateur): any {
    console.log('uid : ' + utilisateur.uid);
    let options = {
      withCredentials: true
    };
    this.httpClient
      .post<any>(this.url + '/create', utilisateur, options)
      .subscribe(
        (response) => {
          console.log('création utilisateur OK');
          alert('utilisateur ' + utilisateur.nom + ' créé');
          this.allUtilisateurs.push(response);
          this.emitAllUtilisateursSubject();
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
          alert('utilisateur ' + utilisateur.nom + ' mis à jour');
          var index = 0;
          for (let utilisateur of this.allUtilisateurs) {
            if (utilisateur.id == response.id) {
              this.allUtilisateurs[index] = response;
            }
            index = index + 1;
          }
          this.emitAllUtilisateursSubject();
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
          var index = 0;
          var indexRecherche: number;
          for (let utilisateurCourant of this.allUtilisateurs) {
            if (utilisateurCourant.id == utilisateur.id) {
              indexRecherche = index;
            }
            index = index + 1;
          }
          this.allUtilisateurs.splice(indexRecherche, 1);
          this.emitAllUtilisateursSubject();
        },
        (error) => {
          if (error == 'OK') {
            console.log('suppression utilisateur OK');
            alert('utilisateur ' + utilisateur.nom + ' supprimé');
            var index = 0;
            var indexRecherche: number;
            for (let utilisateurCourant of this.allUtilisateurs) {
              if (utilisateurCourant.id == utilisateur.id) {
                indexRecherche = index;
              }
              index = index + 1;
            }
            this.allUtilisateurs.splice(indexRecherche, 1);
            this.emitAllUtilisateursSubject();
          } else {
            alert('utilisateur non supprimé');
            console.log('Erreur ! : ' + error);
          }
        }
      );
  }


}
