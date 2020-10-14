import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-section-article-connexion',
  templateUrl: './section-article-connexion.component.html',
  styleUrls: ['./section-article-connexion.component.css']
})
export class SectionArticleConnexionComponent implements OnInit, OnDestroy {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    sessionStorage.clear();
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      uid: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6}/)]],
      motDePasse: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSignIn() {
    const uid = this.signInForm.get('uid').value;
    const motDePasse = this.signInForm.get('motDePasse').value;

    console.log('UID = ' + uid);
    console.log('Mot de passe = ' + motDePasse);
    this.authService.login(uid, motDePasse);

  }

  onSignInForm(form: NgForm) {
    const username = form.value['username'];
    const password = form.value['password'];
    this.login(username, password);
  }

  login(username: string, password: string) {
    this.authService.login(username, password);
  }

  onSignOut() {
    this.authService.signOut();
  }

  ngOnDestroy() { }

  getIsAuth() {
    return this.authService.getIsAuth();
  }

}
