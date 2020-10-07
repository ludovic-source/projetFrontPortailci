import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionArticleConnexionComponent } from './section-article-connexion/section-article-connexion.component';
import { SectionComponent } from './section/section.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { ThemeService } from './services/theme.service';
import { LienService } from './services/lien.service';
import { EditionService } from './services/edition.service';
import { ProfilService } from './services/profil.service';
import { DroitService } from './services/droit.service';
import { UtilisateurService } from './services/utilisateur.service';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { SectionThemeArbreComponent } from './section-theme-arbre/section-theme-arbre.component';
import { SectionThemeEditionComponent } from './section-theme-edition/section-theme-edition.component';
import { SectionThemeEditionThematiqueComponent } from './section-theme-edition-thematique/section-theme-edition-thematique.component';
import { SectionThemeEditionLienComponent } from './section-theme-edition-lien/section-theme-edition-lien.component';
import { SectionParametrageComponent } from './section-parametrage/section-parametrage.component';
import { SectionParametrageProfilComponent } from './section-parametrage-profil/section-parametrage-profil.component';
import { SectionParametrageUtilisateurComponent } from './section-parametrage-utilisateur/section-parametrage-utilisateur.component';

const appRoutes: Routes = [
  { path: 'connexion', component: SectionArticleConnexionComponent },
  { path: 'theme', canActivate: [AuthGuard], component: SectionComponent },
  { path: 'theme/:id', canActivate: [AuthGuard], component: SectionComponent },
  { path: 'edition', canActivate: [AuthGuard], component: SectionThemeEditionComponent },
  { path: 'parametrage', canActivate: [AuthGuard], component: SectionParametrageComponent },
  { path: '', component: SectionArticleConnexionComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SectionArticleConnexionComponent,
    SectionComponent,
    SectionThemeArbreComponent,
    SectionThemeEditionComponent,
    SectionThemeEditionThematiqueComponent,
    SectionThemeEditionLienComponent,
    SectionParametrageComponent,
    SectionParametrageProfilComponent,
    SectionParametrageUtilisateurComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    AuthService,
    ThemeService,
    LienService,
    EditionService,
    UtilisateurService,
    ProfilService,
    DroitService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
