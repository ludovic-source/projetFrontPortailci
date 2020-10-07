import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject, Observable } from 'rxjs';
import { Thematique } from '../models/Thematique';
import { switchMap, map, tap } from 'rxjs/operators';

@Injectable()
export class ThemeService {

  idThemeEnCours : number;

  allThematiquesSubject = new Subject<any[]>();
  private allThematiques: any[];

  themesSubject = new Subject<any[]>();
  private themes: any[];

  themesNiveau2Subject = new Subject<any[]>();
  private themesNiveau2: any[];

  themesNiveau3Subject = new Subject<any[]>();
  private themesNiveau3: any[];

  private url = 'http://localhost:9095/portailci/thematique/';

  /*
  themesTest = [
            { id: 1,
              nom: 'sportives',
              description: 'voitures sportives',
              niveau: 1,
              idParent: 0,
              imagePath: 'ferrari.jpeg'
            },
            { id: 2,
              nom: 'compactes',
              description: 'voitures compactes',
              niveau: 1,
              idParent: 0,
              imagePath: 'mercedes.webp'
            },
            { id: 3,
              nom: 'berlines',
              description: 'voitures berlines',
              niveau: 1,
              idParent: 0,
              imagePath: 'aucune image'
            },
            { id: 4,
              nom: 'familiales',
              description: 'modèles de familiales',
              niveau: 1,
              idParent: 0,
              imagePath: 'aucune image'
            },
            { id: 5,
              nom: 'SUV',
              description: 'modèles de SUV',
              niveau: 1,
              idParent: 0,
              imagePath: 'lamborghini.webp'
            },
            { id: 6,
              nom: 'camionnettes',
              description: 'modèles de camionnettes',
              niveau: 1,
              idParent: 0,
              imagePath: 'aucune image'
            }
  ]; */

  constructor(private httpClient: HttpClient) {
  }

  emitThemesSubject() {
       this.themesSubject.next(this.themes);
  }

  emitThemesNiveau2Subject() {
      this.themesNiveau2Subject.next(this.themesNiveau2);
  }

  emitThemesNiveau3Subject() {
      this.themesNiveau3Subject.next(this.themesNiveau3);
  }

  emitAllThematiquesSubject() {
      this.allThematiquesSubject.next(this.allThematiques);
  }

  getImageTheme() {
      for (let theme of this.themes) {
          console.log('recherche image thème :' + theme.id);
          this.getData(theme.id)
              .subscribe(
                  imgData => window.localStorage.setItem(theme.id, imgData),
                  err => console.log('Erreur ! : ' + err)
          );
      }
  }

  getData(idTheme: number): Observable<string> {
      return this.httpClient
                     .get(this.url + 'image/id/' + idTheme,
                        { responseType: 'blob', withCredentials: true})
                     .pipe(
                         switchMap(response => this.readFile(response))
                     );
  }

  private readFile(blob: Blob): Observable<string> {
    return Observable.create(obs => {
      const reader = new FileReader();

      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () => obs.next(reader.result);
      reader.onloadend = () => obs.complete();

      return reader.readAsDataURL(blob);
    });
  }

  initThemeNiveau3Subject() {
      this.themesNiveau3.splice(0);
      this.emitThemesNiveau3Subject();
  }

  getThemes(idParent: number) {
    let options = {
               withCredentials: true
    };
    this.httpClient
              .get<any>(this.url + 'findenfants/' + idParent, options)
              .subscribe(
                (response) => {
                  this.themes = response;
                  console.log('récupération thèmes OK');
                  this.trierThemesIdCroissant();
                  this.emitThemesSubject();
                  this.getImageTheme();
                },
                (error) => {
                  console.log('Erreur ! : ' + error);
                }
              );
  }

  getThemesNiveau2(idParent: number) : any[]{
      let options = {
                 withCredentials: true
      };
      this.httpClient
                .get<any>(this.url + 'findenfants/' + idParent, options)
                .subscribe(
                  (response) => {
                    this.themesNiveau2 = response;
                    this.trierThemesNiveau2IdCroissant();
                    this.emitThemesNiveau2Subject();
                  },
                  (error) => {
                    console.log('Erreur ! : ' + error);
                  }
                );
      return this.themesNiveau2;
  }

  getThemesNiveau3(idParent: number) : any[]{
       let options = {
                   withCredentials: true
       };
       this.httpClient
                  .get<any>(this.url + 'findenfants/' + idParent, options)
                  .subscribe(
                    (response) => {
                      this.themesNiveau3 = response;
                      this.trierThemesNiveau3IdCroissant();
                      this.emitThemesNiveau3Subject();
                    },
                    (error) => {
                      console.log('Erreur ! : ' + error);
                    }
                  );
       return this.themesNiveau3;
   }

  getAllThematiques(): any[] {

       let options = {
                   withCredentials: true
       };

       // récupérer les thématiques de niveau 1 (thème)
       this.httpClient
            .get<any>(this.url + 'findenfants/' + 0, options)
            .subscribe(
                (response) => {
                     this.allThematiques = response;
                     for (let thematique of response) {
                        this.getThematiquesNiveau2(thematique.id);
                     }
                     this.emitAllThematiquesSubject();
                },
                (error) => {
                     console.log('Erreur ! : ' + error);
                }
            );
       return this.allThematiques;
  }

  getThematiquesNiveau2(idParent: number) {
      let options = {
                   withCredentials: true
      };
      // récupérer les thématiques de niveau 2 (sous-thèmes)
      this.httpClient
           .get<any>(this.url + 'findenfants/' + idParent, options)
           .subscribe(
               (response) => {
                    for (let thematique of response) {
                       this.allThematiques.push(thematique);
                       this.getThematiquesNiveau3(thematique.id);
                    }
               },
               (error) => {
                    console.log('Erreur ! : ' + error);
               }
           );
  }

  getThematiquesNiveau3(idParent: number) {
      let options = {
                   withCredentials: true
      };
      // récupérer les thématiques de niveau 3 (sous sous-thèmes)
      this.httpClient
           .get<any>(this.url + 'findenfants/' + idParent, options)
           .subscribe(
               (response) => {
                    for (let thematique of response) {
                       this.allThematiques.push(thematique);
                    }
               },
               (error) => {
                    console.log('Erreur ! : ' + error);
               }
           );
  }

  createThematique(thematique: Thematique): any {
      let options = {
                   withCredentials: true
      };
      // Créer une thematique
      this.httpClient
           .post<any>(this.url + 'create', thematique, options)
           .subscribe(
               (response) => {
                    console.log('création thematique OK');
                    alert('thématique ' + response.nom + ' créée');
                    if (response.niveau == 1) {
                        this.themes.push(response);
                        this.emitThemesSubject();
                    }
                    return response;
               },
               (error) => {
                    alert('thématique non créée');
                    console.log('Erreur ! : ' + error);
               }
           );
  }

  deleteThematique(thematique: Thematique) {
      var idThematique = thematique.id;
      console.log('id thématique à supprimer: ' + idThematique);
      let options = {
                   withCredentials: true
      };
      // Supprimer une thematique
      this.httpClient
           .delete(this.url + 'delete/' + idThematique, options)
           .subscribe(
               () => {
                    console.log('suppression thematique OK');
                    alert('thématique ' + thematique.nom + ' supprimée');
                    // supprimer la thématique qsi niveau 1 dans la liste en cours
                    if (thematique.niveau == 1) {
                        var index = 0;
                        var indexRecherche: number;
                        for (let theme of this.themes) {
                            if (theme.id == idThematique) {
                                indexRecherche = index;
                            }
                            index = index + 1;
                        }
                        this.themes.splice(indexRecherche, 1);
                        this.emitThemesSubject();
                    }
               },
               (error) => {
                    alert('thématique non supprimée');
                    console.log('Erreur ! : ' + error);
               }
           );
  }

  updateThematique(thematique: Thematique): any {
      let options = {
                   withCredentials: true
      };
      // Créer une thematique
      this.httpClient
           .put<any>(this.url + 'update', thematique, options)
           .subscribe(
               (response) => {
                    console.log('update thematique OK');
                    alert('thématique ' + response.nom + ' modifiée');
                    if (response.niveau == 1) {
                        var index = 0;
                        for (let theme of this.themes) {
                             if (theme.id == response.id) {
                                  this.themes[index] = response;
                             }
                             index = index + 1;
                        }
                        this.emitThemesSubject();
                    }
                    if (response.niveau == 2) {
                        var index = 0;
                        for (let theme of this.themesNiveau2) {
                             if (theme.id == response.id) {
                                  this.themesNiveau2[index] = response;
                             }
                             index = index + 1;
                        }
                        this.emitThemesNiveau2Subject();
                    }
                    if (response.niveau == 3) {
                        var index = 0;
                        for (let theme of this.themesNiveau3) {
                             if (theme.id == response.id) {
                                  this.themesNiveau3[index] = response;
                             }
                             index = index + 1;
                        }
                        this.emitThemesNiveau3Subject();
                    }

                    return response;
               },
               (error) => {
                    alert('thématique non modifiée');
                    console.log('Erreur ! : ' + error);
               }
           );
  }

  uploadImageTheme(theme: any, file) {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('theme', theme.id);

      let options = {
//                  reportProgress: true,
//                  observe: 'event',
                  withCredentials: true
      };
      // uploader l'image de fond d'un thème
      this.httpClient
           .post<any>(this.url + 'updateupload/id', uploadData, options)
           .subscribe(
               (response) => {
                    console.log('upload image OK');
                    alert('thématique ' + response.nom + ' : image uploadée avec succès');
                    return response;
               },
               (error) => {
                    alert('upload image non réalisé');
                    console.log('Erreur ! : ' + error);
               }
//               (event) => {
//                    console.log(event);
//               }
           );
  }

  trierThemesIdCroissant() {
      this.themes.sort(function(a,b) {
          if (a.id > b.id) { return 1;}
          if (a.id < b.id) { return -1;}
          return 0;
      });
  }

  trierThemesNiveau2IdCroissant() {
      this.themesNiveau2.sort(function(a,b) {
          if (a.id > b.id) { return 1;}
          if (a.id < b.id) { return -1;}
          return 0;
      });
  }

  trierThemesNiveau3IdCroissant() {
      this.themesNiveau3.sort(function(a,b) {
          if (a.id > b.id) { return 1;}
          if (a.id < b.id) { return -1;}
          return 0;
      });
  }

}
