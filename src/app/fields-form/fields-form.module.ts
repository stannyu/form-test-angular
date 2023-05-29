import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FieldDirective } from './field-type.directive';
import { FieldsFormComponent } from './fields-form.component';

@NgModule({
  declarations: [FieldsFormComponent, FieldDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FieldsFormComponent, FieldDirective],
})
export class FieldsFormModule {}
