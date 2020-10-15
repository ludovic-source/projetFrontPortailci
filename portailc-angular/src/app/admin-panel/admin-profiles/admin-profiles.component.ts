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
    const droits = this.droitService.getDroitssValue();
    for (let droit of Object.values(droits)) {
      this.profileForm.addControl(droit.nom, new FormControl(false));
    }
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

  editProfile(profil: Profil) {
    console.log(profil);
    this.profil = profil;
    console.log(this.profil);
    this.updateUserFormValues();
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
          this.profilService.deleteProfil(profil);
      }
    });
  }

  deleteSelectedProfiles() {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer les utilisateurs sélectionnés ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

          this.selectedProfiles.forEach(profile => {
            this.profilService.deleteProfil(profile);
          });
          this.selectedProfiles = null;
      }
    });
  }

  async saveProfile() {
    console.log(this.profileForm.value);

    let droitsAAjouterAuProfil: Droit[] = [];
    this.droitService.getAllDroits();
    const tableauDroits: Droit[] = this.droitService.getDroitssValue();

    Object.keys(this.profileForm.controls).forEach(key => {
      const controlName = key;
      const value = this.profileForm.controls[key].value;

      if (value == true) {
        console.log(key + ' : ' + value);
        for (const droit of tableauDroits) {
          if (droit.nom == key) {
            droitsAAjouterAuProfil = [...droitsAAjouterAuProfil, droit];
          }
        }
      }
    });

    let profilASauvegarder = new Profil();
    profilASauvegarder.id = this.profileForm.controls['id'].value;
    profilASauvegarder.nom = this.profileForm.controls['nom'].value;
    profilASauvegarder.description = this.profileForm.controls['description'].value;
    profilASauvegarder.droits = droitsAAjouterAuProfil;
    console.log(profilASauvegarder);
    console.log(profilASauvegarder.id);
    if (profilASauvegarder.id == null) {
      await this.profilService.createProfil(profilASauvegarder);
    } else {
      await this.profilService.updateProfil(profilASauvegarder);
    }
    this.hideDialog();
    this.profil = new Profil();
  }

  isDroitInThisProfil(nomDroitAControler: string, profilAControler: Profil) {
    // let compteur = 0;
    // for (const droit of Object.values(profil.droits)) {
    //   console.log(nomDuDroit + ' = ' + droit.nom);
    //   if (nomDuDroit == droit.nom) {
    //     compteur = compteur + 1;
    //     console.log(profil.nom + ' :              ' + nomDuDroit + ' = ' + droit.nom + '                  HOURRRRRRRRRRRRRRRRRRRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA   ' + compteur);

    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    const isIn = false;
    for (let droit of profilAControler.droits) {
      console.log(profilAControler.nom + ' // ' + droit.nom + ' = ' + nomDroitAControler + ' ' + (nomDroitAControler == droit.nom));

    }

  }
}
