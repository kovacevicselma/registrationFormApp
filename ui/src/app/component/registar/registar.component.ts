import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.css']
})
export class RegistarComponent {
  FirstName: string = '';
  SecondName: string = '';
  Email: string = '';
  Pass: string = '';
  UserIdToDelete: number | undefined;
  readonly APIUrl = 'http://localhost:5292/api/FormApp/';
  users: any[] = [];
  successMessage: string = '';
  deleteMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshUsers();
  }

  refreshUsers() {
    this.http.get(this.APIUrl + 'GetUsers').subscribe((data: any) => {
      this.users = data;
    });
  }

  onSubmit() {
    const newUser = {
      firstName: this.FirstName,
      lastName: this.SecondName,
      email: this.Email,
      password: this.Pass
    };

    this.http.post('http://localhost:5292/api/FormApp/AddUsers?FirstName='+this.FirstName+'&SecondName='+this.SecondName+'&Email='+this.Email+'&Pass='+this.Pass, newUser).subscribe((response: any) => {
      console.log('Registration successful:', response);
      this.successMessage = 'Korisnik uspešno dodat.';
      this.refreshUsers();
      this.FirstName = '';
      this.SecondName = '';
      this.Email = '';
      this.Pass = '';
    });
  }

  onDeleteUser() {
    if (this.UserIdToDelete !== undefined) {
      const deleteUrl = `http://localhost:5292/api/FormApp/DeleteUsers?ID=${this.UserIdToDelete}`;

      this.http.delete(deleteUrl).subscribe((response: any) => {
        console.log(`Korisnik sa ID ${this.UserIdToDelete} uspešno izbrisan.`);
        this.deleteMessage = `Korisnik sa ID ${this.UserIdToDelete} uspešno izbrisan.`;
        this.refreshUsers();
      });
    } else {
      console.error('Niste uneli ID korisnika za brisanje.');
    }
  }
}
