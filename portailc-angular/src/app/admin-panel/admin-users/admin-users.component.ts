import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profil } from 'src/app/models/Profil';
import { User } from 'src/app/models/User';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { ProfilService } from 'src/app/services/profil.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  styles: [`
      :host ::ng-deep .p-dialog .user-image {
          width: 150px;
          margin: 0 auto 2rem auto;
          display: block;
      }
  `],
  providers: [MessageService, ConfirmationService]
})
export class AdminUsersComponent implements OnInit {

  userDialog: boolean;

  users$: Observable<User[]>;
  user: User;
  selectedUsers: User[];

  profils$: Observable<Profil[]>;
  profil: Profil;

  submitted: boolean;

  cols: any[];

  searchInRefoForm: FormGroup;
  userForm: FormGroup;

  constructor(
    private utilisateurService: UtilisateurService,
    private profilService: ProfilService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.utilisateurService.getAllUtilisateurs();
    this.users$ = this.utilisateurService.utilisateurs$;
    this.profilService.getAllProfils();
    this.profils$ = this.profilService.profils$;
    this.user = {};
    console.log('Admin-users.component => users$ = ');
    console.log(this.utilisateurService.getUtilisateursValue());
    console.log('Admin-users.component => profils$ = ');
    console.log(this.profilService.getProfilsValue());
    this.initForm();

  }

  initForm() {
    // Initialisation du formulaire permettant de récupérer un utilisateur depuis le REFO par son UID
    this.searchInRefoForm = this.formBuilder.group({
      uid: ['', Validators.required, , Validators.pattern(/[0-9a-zA-Z]{6}/)]
    });
    // Initialisation du formulaire utilisateur
    this.userForm = this.formBuilder.group({
      id: [this.user.id],
      uid: [this.user.uid, Validators.required, , Validators.pattern(/[0-9a-zA-Z]{6}/)],
      nom: [this.user.nom, Validators.required, , Validators.pattern(/[0-9a-zA-Z]/)],
      prenom: [this.user.prenom, Validators.required, , Validators.pattern(/[0-9a-zA-Z]/)],
      uoAffectation: [this.user.uoAffectation, Validators.required, , Validators.pattern(/[0-9a-zA-Z]/)],
      siteExercice: [this.user.siteExercice, Validators.required, , Validators.pattern(/[0-9a-zA-Z]/)],
      fonction: [this.user.fonction, Validators.required, , Validators.pattern(/[0-9a-zA-Z]/)],
      profil: [this.user.profil]
    });
  }

  updateUserFormValues() {
    this.userForm.controls.id.setValue(this.user.id);
    this.userForm.controls.uid.setValue(this.user.uid);
    this.userForm.controls.nom.setValue(this.user.nom);
    this.userForm.controls.prenom.setValue(this.user.prenom);
    this.userForm.controls.uoAffectation.setValue(this.user.uoAffectation);
    this.userForm.controls.siteExercice.setValue(this.user.siteExercice);
    this.userForm.controls.fonction.setValue(this.user.fonction);
    this.userForm.controls.profil.setValue(this.user.profil);
  }

  // On force la méthode à attendre le retour de la requête grâce à async / await
  async searchCollaborateurFromRefo() {
    const uid = this.searchInRefoForm.controls.uid.value;

    // On va chercher le collaborateur présent dans le REFO que l'on stocke dans
    // le _collaborateurSubject
    await this.utilisateurService.getCollaborateurRefoByUid(uid);
    // On récupère la valeur du _collaborateurSubject
    this.user = this.utilisateurService.getCollaborateurValue();

    // On met à jour les champs du formulaire avec les valeurs récupérées
    this.updateUserFormValues();
  }

  // Fenêtre modale
  openNew() {

    this.user = {};
    this.updateUserFormValues();
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer les utilisateurs sélectionnés ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

          this.selectedUsers.forEach(user => {
            this.utilisateurService.deleteUtilisateur(this.utilisateurService.mapToUtilisateur(user));
          });
          this.selectedUsers = null;
      }
    });
  }

  editUser(user: User) {
    console.log(user);
    this.user = user;
    console.log(this.user);
    this.updateUserFormValues();
    this.userDialog = true;
  }

  deleteUser(user: any) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer l\'utilisateur ' + user.uid + ' : ' + user.nom + '?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.utilisateurService.deleteUtilisateur(user);

      }
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;
    console.log(this.userForm.value);

    let utilisateurASauvegarder = new Utilisateur();
    utilisateurASauvegarder = this.userForm.value;
    console.log(utilisateurASauvegarder);



    // Si l'id existe, on procède à une modification
    if (this.user.id) {

      this.utilisateurService.updateUtilisateur(utilisateurASauvegarder);

    }
    // Sinon on crée un nouvel utilisateur
    else {
      // On crée le nouvel utilisateur en base grâce au service
      this.utilisateurService.createUtilisateur(utilisateurASauvegarder);
    }
    this.hideDialog();
    this.user = new User();


  }




}
