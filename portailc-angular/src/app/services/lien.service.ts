import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Lien } from '../models/Lien';

@Injectable()
export class LienService {

    liensNiveau1Subject = new Subject<any[]>();
    private liensNiveau1: any[];

    liensNiveau2Subject = new Subject<any[]>();
    private liensNiveau2: any[];

    liensSubject = new Subject<any[]>();
    private liens: any[];

    private url = 'http://localhost:9095/portailci/lien/';

    constructor(private httpClient: HttpClient) {
    }

    emitLiensNiveau1Subject() {
        this.liensNiveau1Subject.next(this.liensNiveau1);
    }

    emitLiensNiveau2Subject() {
        this.liensNiveau2Subject.next(this.liensNiveau2);
    }

    emitLiensSubject() {
        this.liensSubject.next(this.liens);
    }

    getLiensNiveau1(idThematique: number) : any[] {
        let options = {
                   withCredentials: true
             };
             this.httpClient
                  .get<any>(this.url + 'find/thematique/' + idThematique, options)
                  .subscribe(
                    (response) => {
                      this.liensNiveau1 = response;
                      console.log('récupération liens niveau 1 OK');
                      console.log('nbre liens rattachés niveau 1: ' + this.liensNiveau1.length);
                      this.emitLiensNiveau1Subject();
                    },
                    (error) => {
                      console.log('Erreur ! : ' + error);
                    }
             );
        return this.liensNiveau1;
    }

    getLiens(idThematique: number) : any[] {
        let options = {
                   withCredentials: true
             };
             this.httpClient
                  .get<any>(this.url + 'find/thematique/' + idThematique, options)
                  .subscribe(
                    (response) => {
                      this.liens = response;
                      console.log('récupération liens enfant OK');
                      console.log('nbre liens enfants : ' + this.liens.length);
                      this.emitLiensSubject();
                    },
                    (error) => {
                      console.log('Erreur ! : ' + error);
                    }
             );
        return this.liens;
    }

    getLiensNiveau2(idThematique: number) : any[] {
        let options = {
                   withCredentials: true
             };
             this.httpClient
                  .get<any>(this.url + 'find/thematique/' + idThematique, options)
                  .subscribe(
                    (response) => {
                      this.liensNiveau2 = response;
                      console.log('récupération liens niveau 2 OK');
                      console.log('nbre liens niveau 2 : ' + this.liensNiveau2.length);
                      this.emitLiensNiveau2Subject();
                    },
                    (error) => {
                      console.log('Erreur ! : ' + error);
                    }
             );
        return this.liensNiveau2;
    }

    createLien(lien :Lien): any {
        let options = {
                           withCredentials: true
        };
        // Créer un lien
        this.httpClient
             .post<any>(this.url + 'create', lien, options)
             .subscribe(
                  (response) => {
                      console.log('création lien OK');
                      alert('lien ' + response.nom + ' créé');
                      return response;
                  },
                  (error) => {
                      alert('lien non créé');
                      console.log('Erreur ! : ' + error);
                  }
        );
    }

    publierLien(lien :Lien): any {
        let options = {
             withCredentials: true
        };
        // Publier un lien
        this.httpClient
             .put<any>(this.url + 'publier', lien, options)
             .subscribe(
                  (response) => {
                      console.log('publication lien OK');
                      alert('lien ' + response.nom + ' publié');
                      return response;
                  },
                  (error) => {
                      alert('lien non publié');
                      console.log('Erreur ! : ' + error);
                  }
        );
    }

    depublierLien(lien :Lien): any {
        let options = {
             withCredentials: true
        };
        // Depublier un lien
        this.httpClient
             .put<any>(this.url + 'depublier', lien, options)
             .subscribe(
                  (response) => {
                      console.log('dépublication lien OK');
                      alert('lien ' + response.nom + ' dépublié');
                      return response;
                  },
                  (error) => {
                      alert('lien non dépublié');
                      console.log('Erreur ! : ' + error);
                  }
        );
    }

    updateLien(lien :Lien): any {
        let options = {
             withCredentials: true
        };
        // modifier un lien
        this.httpClient
             .put<any>(this.url + 'modifier', lien, options)
             .subscribe(
                  (response) => {
                      console.log('modification lien OK');
                      alert('lien ' + response.nom + ' modifié');
                      return response;
                  },
                  (error) => {
                      alert('lien non modifié');
                      console.log('Erreur ! : ' + error);
                  }
        );
    }

}
