import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthService {

<<<<<<< HEAD
  userSubject = new Subject<any>();

  private user =
                  { isAuth : false,
                    username : "",
                    droits : [{
                        id: 0,
                        nom: '',
                        description: ''
                    }]
                  }
                 ;

  themes: any[];
  themesSubscription: Subscription;
=======
  themes : any[];
  themesSubscription : Subscription;
>>>>>>> ec6c362... Pour que le bouton actualiser du navigateur ne ferme pas la session, j'ai stocké les informations du user dans le sessionStorage, et j'ai ajouté une observation de l'évènement NavigationStart pour indiquer au composant app.component.ts qu'il faut récupérer les thèmes pour le menu.

  constructor(private httpClient: HttpClient, private themeService: ThemeService, private router: Router) {

  }

  signOut() {
    this.logout();
    sessionStorage.clear();
  }

  getIsAuth() {
<<<<<<< HEAD
    return this.user.isAuth;
    // return true;
=======
    if (sessionStorage.getItem('isAuth') == 'true') {
        return true;
    } else {
        return false;
    }
>>>>>>> ec6c362... Pour que le bouton actualiser du navigateur ne ferme pas la session, j'ai stocké les informations du user dans le sessionStorage, et j'ai ajouté une observation de l'évènement NavigationStart pour indiquer au composant app.component.ts qu'il faut récupérer les thèmes pour le menu.
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  // version Angular 6
  login(username, password) {
       let body = new URLSearchParams();
       body.set('username', username);
       body.set('password', password);
       let url = 'http://localhost:9095/login';
       let options = {
           headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
           withCredentials: true
       };
       console.log("user : " + username);
       this.httpClient.post<boolean>(url, body.toString(), options)
             .subscribe(isValid => {
               console.log("retour de l'appel = " + isValid)
               if (isValid) {
                   sessionStorage.setItem('isAuth', 'true');
                   sessionStorage.setItem('username', username);
                   this.getProfil(username);
                   this.preparationMenuNav();
                   this.router.navigate(['navigation']);
               }
       });

  }

  logout() {
       let body = new URLSearchParams();
       body.set('username', sessionStorage.getItem('username'));
       let url = 'http://localhost:9095/logout';
       let options = {
           headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
           withCredentials: true
       };
       this.httpClient.post<boolean>(url, body.toString(), options)
             .subscribe(isValid => {
                   this.router.navigate(['']);
               }
              );
  }

  getProfil(username) {
     let options = {
           withCredentials: true
     };
     this.httpClient
          .get<any>('http://localhost:9095/portailci/profils/get/connectedUser', options)
          .subscribe(
            (response) => {
              console.log('profil : ' + response.nom);
              sessionStorage.setItem('droits', JSON.stringify(response.droits));
              for (let droit of response.droits) {
                  console.log('droits : ' + droit.nom);
              }
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
     );
  }

  controleDroitUser(droitAVerifier: string) : boolean {
      var droits:any[];
      droits = JSON.parse(sessionStorage.getItem('droits'));
      if (droits != null) {
        for (let droit of droits) {
            if (droit.nom == droitAVerifier) {
                return true;
            }
        }
      }  
      return false;
  }

  // permet de récupérer les thèmes pour les afficher dans le menu - cette opération ne peut se faire que quand
  //       l'utilisateur est authentitifié.
  // Au départ je voulais le faire dans SectionArticleConnexionComponent.ts, mais la fonction await ne permet pas une
  //       bonne gestion de la synchronisation pour les cas où le mot de passe a été erronée. L'utilisateur est
  //       obligé de resaisir son mot de passe.
  preparationMenuNav() {
      this.themeService.getThemes(0);
      this.themesSubscription = this.themeService.themesSubject.subscribe(
                      (themes: any[]) => {
                                            this.themes = themes;
                                         });
      this.themeService.emitThemesSubject();
  }

}
