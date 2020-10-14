import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Droit } from 'src/app/models/Droit';
import { Profil } from 'src/app/models/Profil';
import { DroitService } from 'src/app/services/droit.service';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-admin-profiles',
  templateUrl: './admin-profiles.component.html',
  styleUrls: ['./admin-profiles.component.css'],
  styles: [`
      :host ::ng-deep .p-dialog .user-image {
          width: 150px;
          margin: 0 auto 2rem auto;
          display: block;
      }
  `],
  providers: [MessageService, ConfirmationService]
})
export class AdminProfilesComponent implements OnInit {

  profileDialog: boolean;

  profiles$: Observable<Profil[]>;

  profils$: Observable<Profil[]>;
  profil: Profil;
  selectedProfiles: Profil[];

  droits$: Observable<Droit[]>;
  droit: Droit;

  submitted: boolean;

  cols: any[];

  profileForm: FormGroup;

  constructor(
    private profilService: ProfilService,
    private droitService: DroitService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder) {  }

  ngOnInit(): void {
    this.profilService.getAllProfils();
    this.profils$ = this.profilService.profils$;

    this.droitService.getAllDroits();
    this.droits$ = this.droitService.droits$;
    this.profil = new Profil();
    this.initForm();
  }

  initForm() {

    // Initialisation du formulaire utilisateur
    this.profileForm = this.formBuilder.group({
      id: [this.profil.id],
      nom: [this.profil.nom, Validators.required, , Validators.pattern(/[0-9a-zA-Z]/)],
      description: [this.profil.description, Validators.required, , Validators.pattern(/[0-9a-zA-Z]/)],

    });
  }
  hideDialog() {
    this.profileDialog = false;
    this.submitted = false;
  }

  saveProfile() {

  }
}
