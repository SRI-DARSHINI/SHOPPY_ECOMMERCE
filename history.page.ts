import { Component, OnInit } from '@angular/core';
import { PurchaseHistoryService } from './purchase-history.service';
import {
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  
  
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  imports: [
    RouterModule,
    IonItem,
    IonLabel,
    IonList,
    IonThumbnail, IonContent, IonHeader, IonTitle, IonToolbar
  ],
})
export class HistoryPage implements OnInit {
  purchaseHistory: any[] = [];
  userId = 'USER_ID_HERE'; // Replace this with the logged-in user's ID

  constructor(private purchaseHistoryService: PurchaseHistoryService) {}

  ngOnInit() {
    this.fetchPurchaseHistory();
  }

  fetchPurchaseHistory() {
    this.purchaseHistoryService.getPurchaseHistory(this.userId).subscribe({
      next: (data) => {
        this.purchaseHistory = data;
      },
      error: (err) => {
        console.error('Error fetching purchase history:', err);
      },
    });
  }
}
