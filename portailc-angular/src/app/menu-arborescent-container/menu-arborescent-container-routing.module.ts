import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionThemeEditionComponent } from '../section-theme-edition/section-theme-edition.component';
import { SectionComponent } from '../section/section.component';
import { AuthGuard } from '../services/auth-guard.service';
import { MenuArborescentContainerComponent } from './menu-arborescent-container.component';


const routes: Routes = [
  {
    path: '',
    component: MenuArborescentContainerComponent,
    children: [
  { path: 'theme', canActivate: [AuthGuard], component: SectionComponent },
  { path: 'theme/:id', canActivate: [AuthGuard], component: SectionComponent },
  { path: 'edition', canActivate: [AuthGuard], component: SectionThemeEditionComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuArborescentContainerRoutingModule { }
