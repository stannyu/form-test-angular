import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FieldsFormModule } from './fields-form/fields-form.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, ReactiveFormsModule, BrowserModule, FieldsFormModule],
  bootstrap: [AppComponent],
})
export class AppComponentsModule {}
