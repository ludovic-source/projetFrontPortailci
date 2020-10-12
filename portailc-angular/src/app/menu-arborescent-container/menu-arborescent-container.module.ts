import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuArborescentContainerRoutingModule } from './menu-arborescent-container-routing.module';
import { MenuArborescentContainerComponent } from './menu-arborescent-container.component';


@NgModule({
  declarations: [
    MenuArborescentContainerComponent
  ],
  imports: [
    CommonModule,
    MenuArborescentContainerRoutingModule
  ],
  exports: [
    MenuArborescentContainerComponent
  ],
  providers: []
})
export class MenuArborescentContainerModule { }
