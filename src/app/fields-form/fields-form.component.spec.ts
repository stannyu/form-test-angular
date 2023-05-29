import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';

import { FieldDirective } from './field-type.directive';
import {
  FieldVisibilityStatus,
  FieldsFormComponent,
  EnchancedFieldInterface,
} from './fields-form.component';
import { FormFieldInterface } from '../types';

describe('FieldsFormComponent', () => {
  let component: FieldsFormComponent;
  let fixture: ComponentFixture<FieldsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FieldsFormComponent, FieldDirective],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group', () => {
    expect(component.formGroup).toBeTruthy();
  });

  it('should generate enchanced field data list when field data list changes', fakeAsync(() => {
    const fieldList: FormFieldInterface[] = [
      {
        field: 'email',
        label: 'Email',
        type: 'text',
        hidden: false,
        mandatory: true,
      },
    ];
    component.fieldList = fieldList;
    component.ngOnChanges();
    tick();
    fixture.detectChanges();
    expect(component.enchancedFieldsList.length).toBe(1);
  }));

  it('should toggle field visibility', fakeAsync(() => {
    const formControlMock = new FormControl();
    const fieldData: EnchancedFieldInterface = {
      field: 'test',
      label: 'Test Label',
      type: 'Test Type',
      mandatory: false,
      hidden: false,
      formControl: formControlMock,
      visibilityStatus: FieldVisibilityStatus.HIDDEN,
    };

    component.enchancedFieldsList.push(fieldData);
    component.toggleVisibility('test');
    tick();
    fixture.detectChanges();
    expect(component.enchancedFieldsList[0].hidden).toBe(true);
  }));
});
