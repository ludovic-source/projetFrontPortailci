import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { PrimeNgModule } from '../shared/prime-ng/prime-ng.module';
import { AdminPanelRoutingModule } from './admin-panel-routing';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminUsersComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    // Ajout des TabMenuModule, TableModule, DialogModule,ConfirmDialogModule  en direct car l'import par PrimeNgModule
    // ne fonctionne pas, sujet à creuser pour tout centraliser dans le PrimeNgModule
    TabMenuModule,
    TableModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule,
    ToolbarModule,
    ToastModule,
    InputTextModule,
    DropdownModule

  ],
  exports: [
    AdminPanelComponent
  ],
  providers: []
})
export class AdminPanelModule { }
