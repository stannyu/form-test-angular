import { Component } from '@angular/core';
import { FormFieldInterface } from './types';

import fieldsData from './to-render.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly fieldList: FormFieldInterface[];

  constructor() {
    this.fieldList = fieldsData as FormFieldInterface[];
  }
}
