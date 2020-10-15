import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs/Subscription';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  themes: any[];
  themesSubscription: Subscription;

  constructor(private httpClient: HttpClient, private themeService: ThemeService, private router: Router) {

  }

  signOut() {
    this.logout();
    sessionStorage.clear();
  }

  getIsAuth() {
    if (sessionStorage.getItem('isAuth') == 'true') {
      return true;
    } else {
      return false;
    }
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  // version Angular 6
  login(username, password) {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    let url = environment.DOMAIN_URL + '/login';
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
    let url = environment.DOMAIN_URL + '/logout';
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
      .get<any>(environment.API_URL + '/profils/get/connectedUser', options)
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

  controleDroitUser(droitAVerifier: string): boolean {
    var droits: any[];
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
