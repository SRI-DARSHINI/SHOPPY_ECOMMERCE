import { Component } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  
  
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'homepage',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    RouterModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    IonThumbnail,
    IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar
  ],
})
export class HomePage {
  userName: string | null = null;

  constructor() {
    // Retrieve the user's name from sessionStorage
    this.userName = sessionStorage.getItem('userName');
  }
}