
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';  // Ensure IonicModule is imported
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { routes } from './app.routes';
@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [
    RouterModule.forRoot(routes),
    CommonModule, 
    BrowserModule,
    IonicModule.forRoot(),  // Initialize Ionic module for your app
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', loadChildren: () => import('./app.routes').then(m => m.routes) },
    ]),
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
