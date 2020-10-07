import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Droit } from '../models/Droit';

@Injectable()
export class DroitService {

    allDroitsSubject = new Subject<any[]>();
    private allDroits: any[];

    private url = 'http://localhost:9095/portailci/droits/';

    constructor(private httpClient: HttpClient) {
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
