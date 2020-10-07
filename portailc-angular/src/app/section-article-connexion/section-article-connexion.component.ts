import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-section-article-connexion',
  templateUrl: './section-article-connexion.component.html',
  styleUrls: ['./section-article-connexion.component.css']
})
export class SectionArticleConnexionComponent implements OnInit, OnDestroy {

  user: any;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
     this.userSubscription = this.authService.userSubject.subscribe(this.user);
     this.authService.emitUserSubject();
  }

  onSignInForm(form: NgForm) {
      const username = form.value['username'];
      const password = form.value['password'];
      this.login(username, password);
   }

   async login(username: string, password: string) {
      this.authService.login(username, password);
   }

   onSignOut() {
      this.authService.signOut();
   }

   ngOnDestroy() {
      this.userSubscription.unsubscribe();
   }

   getIsAuth() {
      return this.authService.getIsAuth();
   }

}
