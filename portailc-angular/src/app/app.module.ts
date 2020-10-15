import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
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
import { HeaderComponent } from './header/header.component';
import { PrimeNgModule } from './shared/prime-ng/prime-ng.module';
import { AdminGuard } from './services/admin.guard';

const appRoutes: Routes = [

  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin-panel/admin-panel.module')
                        .then(module => module.AdminPanelModule)
  },
  {
    path: 'navigation',
    loadChildren: () => import('./menu-arborescent-container/menu-arborescent-container.module')
                        .then(module => module.MenuArborescentContainerModule)
  },
  { path: 'connexion', component: SectionArticleConnexionComponent },
  { path: '', redirectTo: 'connexion', pathMatch: 'full'},
  { path: '**', redirectTo: 'connexion'}
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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    PrimeNgModule
  ],
  providers: [
    AdminGuard,
    AuthGuard,
    AuthService,
    ThemeService,
    LienService,
    EditionService,
    UtilisateurService,
    ProfilService,
    DroitService,
    PreloadAllModules,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [
    PrimeNgModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
