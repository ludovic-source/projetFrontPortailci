import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { Utilisateur } from 'src/app/models/Utilisateur';
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

  submitted: boolean;

  cols: any[];

  searchInRefoForm: FormGroup;

  constructor(
    private utilisateurService: UtilisateurService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.utilisateurService.getAllUtilisateurs();
    this.users$ = this.utilisateurService.utilisateurs$;

    console.log('Admin-users.component => users$ = ');
    console.log(this.users$);
  }
  openNew() {
    this.user = new User();
    this.submitted = false;
    this.userDialog = true;
  }


  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.users$ = this.users$.filter(val => !this.selectedUsers.includes(val));
        this.selectedUsers = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'users Deleted', life: 3000 });
      }
    });
  }

  editUser(user: User) {
    this.user = user;
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.uid + ' : ' + user.nom + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.users$ = this.users$.filter(val => val.id !== user.id);
        //this.user = ;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;

    if (this.user.nom.trim()) {
      // Si l'id existe, on procède à une modification
      if (this.user.id) {
        this.utilisateurService.updateUtilisateur(this.user.mapToUtilisateur());
        this.users$[this.findIndexById(this.user.id)] = this.user;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur mis à jour avec succès!', life: 3000 });
      }
      // Sinon on crée un nouvel utilisateur
      else {
        // On crée le nouvel utilisateur en base, on reçoit un utilisateur avec son id en retour
        let nouvelUtilisateur = this.utilisateurService.createUtilisateur(this.user.mapToUtilisateur());
        // On récupère la valeur de _utilisateursSubject
        let utilisateurs = this.utilisateurService.getUtilisateursValue();
        // On y insère le nouvel utilisateur
        utilisateurs = [...utilisateurs, nouvelUtilisateur];
        // On met à jour la vue en modifiant _utilisateursSubject
        this.utilisateurService.setUtilisateursSubject(utilisateurs);

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur créé avec succès!', life: 3000 });
      }

      //this.users = [...this.users];
      this.userDialog = false;
      this.user = new User();
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    // On récupère la valeur de _utilisateursSubject
    let utilisateurs = this.utilisateurService.getUtilisateursValue();
    // On cherche l'index de l'élément dans la collection
    for (let i = 0; i < utilisateurs.length; i++) {
      if (utilisateurs[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  searchCollaborateurFromRefo() {
    const uid = this.searchInRefoForm.controls.uid.value;
    console.log(uid);
    console.log(this.utilisateurService.getCollaborateurRefoByUid(uid));
  }
}
