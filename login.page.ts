import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.http
        .post('http://localhost:3000/api/login', { email, password })
        .subscribe(
          async (response: any) => {
            // Assuming the response contains the user details
            const userName = response.userName; // Adjust based on your API response structure
            sessionStorage.setItem('userName', userName); // Store the username in session storage

            const alert = await this.alertCtrl.create({
              header: 'Success',
              message: 'Login successful!',
              buttons: ['OK'],
            });
            await alert.present();
            alert.onDidDismiss().then(() => {
              this.router.navigate(['/home']);
            });
          },
          async (error) => {
            const alert = await this.alertCtrl.create({
              header: 'Error',
              message: 'Invalid credentials. Please try again.',
              buttons: ['OK'],
            });
            await alert.present();
          }
        );
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
