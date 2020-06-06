import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiModule, BASE_PATH } from '../client';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ApiModule
  ],
  providers: [{
    provide: BASE_PATH, useValue: environment.apiUrl
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
