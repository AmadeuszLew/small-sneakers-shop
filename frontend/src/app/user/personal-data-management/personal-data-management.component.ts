import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AlertsService } from '../../shared/alerts.service';
import {User, UserUpdateRequest, AuthorizationService } from '../../authorization';

@Component({
  selector: 'app-personal-data-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './personal-data-management.component.html',
  styleUrl: './personal-data-management.component.css'
})
export class PersonalDataManagementComponent implements OnInit {
  user: User | null = null;
  isLoading = false;
  isEditing = false;
  error = '';
  showPassword = false;
  showDeleteConfirmation = false;
  showDeactivateConfirmation = false;

  userUpdateData: UserUpdateRequest = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: ''
  };

  constructor(
    private userService: UserService,
    private alertService: AlertsService,
    private authService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.isLoading = true;
    this.userService.getUserDetails().subscribe({
      next: (user) => {
        this.user = user;
        this.resetForm();
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Nie udało się załadować danych użytkownika';
        console.error('Error loading user data:', error);
        this.isLoading = false;
      }
    });
  }

  resetForm(): void {
    if (this.user) {
      this.userUpdateData = {
        firstName: this.user.firstName || '',
        lastName: this.user.lastName || '',
        email: this.user.email || '',
        phoneNumber: this.user.phoneNumber || '',
        currentPassword: '',
        newPassword: ''
      };
    }
  }

  onStartEdit(): void {
    this.isEditing = true;
  }

  onCancelEdit(): void {
    this.isEditing = false;
    this.resetForm();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmitUserData(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = '';

    const updateData: UserUpdateRequest = this.getBaseUpdateData();

    if (this.userUpdateData.currentPassword) {
      updateData.currentPassword = this.userUpdateData.currentPassword;
    }

    if (this.userUpdateData.newPassword) {
      updateData.newPassword = this.userUpdateData.newPassword;
    }

    this.userService.updateUserInfo(updateData).subscribe({
      next: (updatedUser:User):void => {
        this.user = updatedUser;
        this.isEditing = false;
        this.isLoading = false;
        this.alertService.riseAlert('success', 'Dane zostały zaktualizowane pomyślnie');

        if (this.shouldRequireUserReload(updatedUser)) {
          this.authService.logout();
          this.router.navigate(['/authorization']);
          this.alertService.riseAlert('info', 'Zaloguj się ponownie, aby potwierdzić zmiany');
        }
      },
      error: (error) => {
        this.error = error?.message || 'Nie udało się zaktualizować danych';
        this.isLoading = false;
        console.error('Error updating user data:', error);
      }
    });
  }

  onToggleDeleteConfirmation(): void {
    this.showDeleteConfirmation = !this.showDeleteConfirmation;
    this.showDeactivateConfirmation = false;
  }

  onToggleDeactivateConfirmation(): void {
    this.showDeactivateConfirmation = !this.showDeactivateConfirmation;
    this.showDeleteConfirmation = false;
  }

  onDeactivateAccount(): void {
    this.isLoading = true;
    this.userService.deactivateAccount().subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/']);
        this.alertService.riseAlert('success', 'Twoje konto zostało dezaktywowane');
      },
      error: (error) => {
        this.error = 'Nie udało się dezaktywować konta';
        this.isLoading = false;
        console.error('Error deactivating account:', error);
      }
    });
  }

  onDeleteAccount(): void {
    this.isLoading = true;
    this.userService.deleteAccount().subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/']);
        this.alertService.riseAlert('success', 'Twoje konto zostało usunięte');
      },
      error: (error) => {
        this.error = 'Nie udało się usunąć konta';
        this.isLoading = false;
        console.error('Error deleting account:', error);
      }
    });
  }

  private getBaseUpdateData():UserUpdateRequest{
    return {
      firstName: this.userUpdateData.firstName,
      lastName: this.userUpdateData.lastName,
      email: this.userUpdateData.email,
      phoneNumber: this.userUpdateData.phoneNumber
    };
  }

  private shouldRequireUserReload(updatedUser: User):boolean{
    return this.authService.user.value && this.authService.user.value.email !== updatedUser.email
  }
}
