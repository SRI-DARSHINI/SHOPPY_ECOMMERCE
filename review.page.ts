import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class ReviewPage implements OnInit {
  reviewForm: FormGroup;
  reviews: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private alertCtrl: AlertController
  ) {
    this.reviewForm = this.fb.group({
      name: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchReviews();
  }

  async onSubmit() {
    if (this.reviewForm.valid) {
      const review = this.reviewForm.value;
      this.http.post('http://localhost:3000/api/reviews', review).subscribe(
        async (response) => {
          const alert = await this.alertCtrl.create({
            header: 'Success',
            message: 'Review submitted successfully!',
            buttons: ['OK'],
          });
          await alert.present();
          this.reviewForm.reset();
          this.fetchReviews();
        },
        async (error) => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Failed to submit review.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
    }
  }

  fetchReviews() {
    this.http.get<any[]>('http://localhost:3000/api/reviews').subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Failed to fetch reviews', error);
      }
    );
  }
}

