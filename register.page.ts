import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Passwords do not match!',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }

      this.http
        .post('http://localhost:3000/api/register', { name, email, password })
        .subscribe(
          async (response: any) => {
            const alert = await this.alertCtrl.create({
              header: 'Success',
              message: 'Registration successful!',
              buttons: ['OK'],
            });
            await alert.present();
            alert.onDidDismiss().then(() => {
              this.router.navigate(['/login']);
            });
          },
          async (error) => {
            const alert = await this.alertCtrl.create({
              header: 'Error',
              message: 'Registration failed. Please try again.',
              buttons: ['OK'],
            });
            await alert.present();
          }
        );
    }
  }
}
