import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Profil } from '../models/Profil';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProfilService {

  // REPRESENTE LA SOURCE DE DONNEES UNIQUE DISTRIBUEE A TOUS LES COMPONENTS
  // Le BehaviorSubject va nous permettre de récupérer la valeur du Subject grâce à getValue()
  private _profilsSubject: BehaviorSubject<any> = new BehaviorSubject({});


  // profils$ est un Observable et peut être consommé par nos Components
  readonly profils$: Observable<Profil[]> = this._profilsSubject.asObservable();

  private url = environment.API_URL + '/profils/';

  constructor(private httpClient: HttpClient) {
  }

  getProfilsValue() {
    return this._profilsSubject.getValue();
  }

  setProfilsSubject(data) {
    this._profilsSubject.next(data);
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
          this.setProfilsSubject(response);
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
          let profils = this.getProfilsValue();
          profils = [...this.getProfilsValue(), response];
          this.setProfilsSubject(profils);

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
          let profilsAModifier = this.getProfilsValue();
          var index = 0;
          for (let profil of this.getProfilsValue()) {
            if (profil.id == response.id) {
              profilsAModifier[index] = response;
            }
            index = index + 1;
          }
          this.setProfilsSubject(profilsAModifier);
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
          var index = 0;
          var indexRecherche: number;
          let profilsAModifier = this.getProfilsValue();

          for (let profilCourant of profilsAModifier) {
            if (profilCourant.id == profil.id) {
              indexRecherche = index;
            }
            index = index + 1;
          }
          profilsAModifier.splice(indexRecherche, 1);
          this.setProfilsSubject(profilsAModifier);
        },
        (error) => {
          if (error == 'OK') {
            console.log('suppression profil OK');
            alert('profil ' + profil.nom + ' supprimé');
            var index = 0;
            var indexRecherche: number;
            let profilsAModifier = this.getProfilsValue();

            for (let profilCourant of profilsAModifier) {
              if (profilCourant.id == profil.id) {
                indexRecherche = index;
              }
              index = index + 1;
            }
            profilsAModifier.splice(indexRecherche, 1);
            this.setProfilsSubject(profilsAModifier);
          } else {
            alert('profil non supprimé');
            console.log('Erreur ! : ' + error);
          }
        }
      );
  }


}
