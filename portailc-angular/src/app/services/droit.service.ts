import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Droit } from '../models/Droit';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DroitService {

  // REPRESENTE LA SOURCE DE DONNEES UNIQUE DISTRIBUEE A TOUS LES COMPONENTS
  // Le BehaviorSubject va nous permettre de récupérer la valeur du Subject grâce à getValue()
  private _droitsSubject: BehaviorSubject<any> = new BehaviorSubject({});


  // profils$ est un Observable et peut être consommé par nos Components
  readonly droits$: Observable<Droit[]> =  this._droitsSubject.asObservable();


    allDroitsSubject = new Subject<any[]>();
    private allDroits: any[];

    private url = 'http://localhost:9095/portailci/droits/';

    constructor(private httpClient: HttpClient) {
    }

    getDroitssValue() {
      return this._droitsSubject.getValue();
    }

    setDroitsSubject(data) {
      this._droitsSubject.next(data);
    }

    emitAllDroitsSubject() {
       this.allDroitsSubject.next(this.allDroits);
    }

    getAllDroits() {
        let options = {
               withCredentials: true
        };
        this.httpClient
              .get<any[]>(this.url + 'get', options)
              .subscribe(
                (response) => {
                  this._droitsSubject.next(response);
                  console.log(this.getDroitssValue());
                  this.allDroits = response;
                  console.log('récupération de tous les droits OK');
                  this.emitAllDroitsSubject();
                },
                (error) => {
                  console.log('Erreur ! : ' + error);
                }
        );
     }
}
