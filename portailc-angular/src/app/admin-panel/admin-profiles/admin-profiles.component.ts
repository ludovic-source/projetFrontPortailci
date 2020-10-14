import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder) { }

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
      description: [this.profil.description, Validators.required, , Validators.pattern(/[0-9a-zA-Z]/)]
    });
    this.addDroitsControlsInForm();
  }

  addDroitsControlsInForm() {
    (this.droitService.getDroitssValue()).forEach((droit: Droit) => {
      this.profileForm.addControl(droit.nom, new FormControl(false));
    });
  }

  updateUserFormValues() {
    this.profileForm.controls.id.setValue(this.profil.id);
    this.profileForm.controls.nom.setValue(this.profil.nom);
    this.profileForm.controls.description.setValue(this.profil.description);

  }

  // Fenêtre modale
  openNew() {

    this.profil = new Profil();
    this.updateUserFormValues();
    this.submitted = false;
    this.profileDialog = true;
  }

  hideDialog() {
    this.profileDialog = false;
    this.submitted = false;
  }

  deleteProfile(profil: any) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer le profil ' + profil.nom + ' ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.profilService.deleteProfil(profil);
          this.messageService.add({ severity: 'success', summary: 'Succès: ', detail: 'Profil supprimé !', life: 3000 });
        } catch (error) {
          this.messageService.add({ severity: 'error', summary: 'Erreur: ', detail: error, life: 3000 });
        }
      }
    });
  }

  saveProfile() {
    console.log(this.profileForm.value);
  }
}
