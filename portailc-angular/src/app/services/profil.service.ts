import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Profil } from '../models/Profil';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProfilService {

  // REPRESENTE LA SOURCE DE DONNEES UNIQUE DISTRIBUEE A TOUS LES COMPONENTS
  // Le BehaviorSubject va nous permettre de récupérer la valeur du Subject grâce à getValue()
  private _profilsSubject: BehaviorSubject<any> = new BehaviorSubject({});


  // profils$ est un Observable et peut être consommé par nos Components
  readonly profils$: Observable<Profil[]> =  this._profilsSubject.asObservable();


  allProfilsSubject = new Subject<any[]>();
  private allProfils: any[];

  private url = 'http://localhost:9095/portailci/profils/';

  constructor(private httpClient: HttpClient) {
  }

  getProfilsValue() {
    return this._profilsSubject.getValue();
  }

  setProfilsSubject(data) {
    this._profilsSubject.next(data);
  }

  emitAllProfilsSubject() {
    this.allProfilsSubject.next(this.allProfils);
  }

  getAllProfils() {
    let options = {
      withCredentials: true
    };
    this.httpClient
      .get<any>(this.url + 'get', options)
      .subscribe(
        (response) => {
          // On stocke les profils dans le Subject
          this._profilsSubject.next(response);
          console.log(this.getProfilsValue());
          this.allProfils = response;
          console.log('récupération de tous les profils OK');
          console.log(response);
          this.emitAllProfilsSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  createProfil(profil: Profil): any {
    let options = {
      withCredentials: true
    };
    this.httpClient
      .post<any>(this.url + 'create', profil, options)
      .subscribe(
        (response) => {
          console.log('création profil OK');
          alert('profil ' + response.nom + ' créé');
          this.allProfils.push(response);
          this.emitAllProfilsSubject();
          return response;
        },
        (error) => {
          alert('profil non créé');
          console.log('Erreur ! : ' + error);
        }
      );
  }

  updateProfil(profil: Profil): any {
    let options = {
      withCredentials: true
    };
    this.httpClient
      .put<any>(this.url + 'update', profil, options)
      .subscribe(
        (response) => {
          console.log('mise à jour profil OK');
          alert('profil ' + response.nom + ' mis à jour');
          var index = 0;
          for (let profil of this.allProfils) {
            if (profil.id == response.id) {
              this.allProfils[index] = response;
            }
            index = index + 1;
          }
          this.emitAllProfilsSubject();
          return response;
        },
        (error) => {
          alert('profil non mis à jour');
          console.log('Erreur ! : ' + error);
        }
      );
  }

  deleteProfil(profil: Profil): any {
    let options = {
      withCredentials: true
    };
    this.httpClient
      .delete(this.url + 'delete/' + profil.id, options)
      .subscribe(
        (response) => {
          console.log('suppression profil OK');
          alert('profil ' + profil.nom + ' supprimé');
          var index = 0;
          var indexRecherche: number;
          for (let profilCourant of this.allProfils) {
            if (profilCourant.id == profil.id) {
              indexRecherche = index;
            }
            index = index + 1;
          }
          this.allProfils.splice(indexRecherche, 1);
          this.emitAllProfilsSubject();
        },
        (error) => {
          if (error == 'OK') {
            console.log('suppression profil OK');
            alert('profil ' + profil.nom + ' supprimé');
            var index = 0;
            var indexRecherche: number;
            for (let profilCourant of this.allProfils) {
              if (profilCourant.id == profil.id) {
                indexRecherche = index;
              }
              index = index + 1;
            }
            this.allProfils.splice(indexRecherche, 1);
            this.emitAllProfilsSubject();
          } else {
            alert('profil non supprimé');
            console.log('Erreur ! : ' + error);
          }
        }
      );
  }


}
