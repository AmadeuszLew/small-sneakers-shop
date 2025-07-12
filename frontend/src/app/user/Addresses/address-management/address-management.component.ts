import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Address } from 'app/authorization/user.model';
import { AlertsService } from 'app/shared/alerts.service';
import { UserService } from "../../user.service";

@Component({
  selector: 'app-address-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './address-management.component.html',
  styleUrl: './address-management.component.css'
})
export class AddressManagementComponent implements OnInit {
  addresses: Address[] = [];
  isLoading = false;
  isAddingNew = false;
  editingIndex: number | null = null;
  error = '';

  newAddress: Address = {
    street: '',
    postcode: '',
    city: '',
    country: '',
    phoneNumber: '',
    main: false
  };

  constructor(
    private userService: UserService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
    console.log("address management")
  }

  loadAddresses(): void {
    this.userService.getUserAddresses().subscribe({
      next: (addresses) => {
        this.addresses = addresses;
      },
      error: (error) => {
        this.error = 'Nie udało się załadować adresów';
        console.error('Error loading addresses:', error);
      }
    });
  }

  onAddNewAddress(): void {
    this.isAddingNew = true;
    this.editingIndex = null;
    this.resetNewAddress();
  }

  onEditAddress(index: number): void {
    this.editingIndex = index;
    this.isAddingNew = false;
    this.newAddress = { ...this.addresses[index] };
  }

  onCancelEdit(): void {
    this.isAddingNew = false;
    this.editingIndex = null;
    this.resetNewAddress();
  }

  onSubmitAddress(form: NgForm): void {
    if (form.invalid) return;

    this.isLoading = true;
    this.error = '';

    if (this.isAddingNew) {
      debugger;
      this.userService.addAddress(this.newAddress).subscribe({
        next: () => {
          this.alertService.riseAlert('success', 'Adres został dodany pomyślnie');
          this.loadAddresses();
          this.onCancelEdit();
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Nie udało się dodać adresu';
          this.isLoading = false;
          console.error('Error adding address:', error);
        }
      });
    } else if (this.editingIndex !== null) {
      this.userService.updateAddress(this.editingIndex, this.newAddress).subscribe({
        next: () => {
          this.alertService.riseAlert('success', 'Adres został zaktualizowany pomyślnie');
          this.loadAddresses();
          this.onCancelEdit();
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Nie udało się zaktualizować adresu';
          this.isLoading = false;
          console.error('Error updating address:', error);
        }
      });
    }
  }

  onDeleteAddress(index: number): void {
    if (confirm('Czy na pewno chcesz usunąć ten adres?')) {
      this.userService.deleteAddress(index).subscribe({
        next: () => {
          this.alertService.riseAlert('success', 'Adres został usunięty pomyślnie');
          this.loadAddresses();
        },
        error: (error) => {
          this.alertService.riseAlert('error', 'Nie udało się usunąć adresu');
          console.error('Error deleting address:', error);
        }
      });
    }
  }

  onSetMainAddress(index: number): void {
    this.userService.setMainAddress(index).subscribe({
      next: () => {
        this.alertService.riseAlert('success', 'Adres główny został zmieniony');
        this.loadAddresses();
      },
      error: (error) => {
        this.alertService.riseAlert('error', 'Nie udało się zmienić adresu głównego');
        console.error('Error setting main address:', error);
      }
    });
  }

  private resetNewAddress(): void {
    this.newAddress = {
      street: '',
      postcode: '',
      city: '',
      country: '',
      phoneNumber: '',
      main: false
    };
  }
}
