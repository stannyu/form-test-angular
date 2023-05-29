import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FieldDirective } from './field-type.directive';
import { FormFieldInterface } from '../types';

// wouldn't use this enum in real life, but it's good enough for this example
export enum FieldVisibilityStatus {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}

export interface EnchancedFieldInterface extends FormFieldInterface {
  formControl: FormControl;
  visibilityStatus: FieldVisibilityStatus;
}

@Component({
  selector: 'app-fields-form',
  templateUrl: './fields-form.component.html',
  styleUrls: ['./fields-form.component.scss'],
})
export class FieldsFormComponent {
  @Input() fieldList?: FormFieldInterface[];

  @ContentChildren(FieldDirective)
  fieldsDirectives?: QueryList<FieldDirective>;

  formGroup: FormGroup;
  fieldByType: Record<string, TemplateRef<any>> = {};
  enchancedFieldsList: EnchancedFieldInterface[] = [];

  constructor(private readonly formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({});
  }

  ngOnChanges(): void {
    this.evaluateEnchancedFields();
  }

  ngAfterViewInit(): void {
    this.initFieldsTemplates();
  }

  toggleVisibility(fieldName: string): void {
    const fieldData = this.getEnchancedField(fieldName);
    if (fieldData) {
      this.changeFieldVisibility(fieldData);
    }
  }

  submit(): void {
    /**
     * TODO: handle form submission
     */
    console.log(this.formGroup.value);
  }

  private evaluateEnchancedFields(): void {
    /**
     * timeout to move this code to the end of the event loop
     */
    setTimeout(() => {
      if (this.fieldList) {
        this.enchancedFieldsList = this.fieldList.map((fieldData) => {
          return this.generateFormField(fieldData);
        });
      }
    }, 0);
  }

  private generateFormField(
    fieldData: FormFieldInterface
  ): EnchancedFieldInterface {
    const formControl = this.createFormControl(fieldData.mandatory);
    if (fieldData.hidden) {
      formControl.disable();
    }
    this.formGroup.addControl(fieldData.field, formControl);
    return {
      ...fieldData,
      visibilityStatus: this.getFieldVisibilityStatus(fieldData.hidden),
      formControl,
    } as EnchancedFieldInterface;
  }

  private createFormControl(isMandatory: boolean) {
    const validators = isMandatory ? [Validators.required] : [];
    return this.formBuilder.control(null, { validators });
  }

  private initFieldsTemplates(): void {
    /**
     * timeout to move this code to the end of the event loop
     */
    setTimeout(() => {
      if (!this.fieldsDirectives) return;

      this.fieldByType = this.fieldsDirectives.reduce(
        (accumulator, currentDirective) => {
          if (currentDirective.name) {
            accumulator[currentDirective.name] = currentDirective.template;
          }
          return accumulator;
        },
        {} as Record<string, TemplateRef<any>>
      );
    }, 0);
  }

  private getEnchancedField(
    field: string
  ): EnchancedFieldInterface | undefined {
    return this.enchancedFieldsList.find((item) => item.field === field);
  }

  private changeFieldVisibility(fieldData: EnchancedFieldInterface): void {
    fieldData.hidden = !fieldData.hidden;
    fieldData.visibilityStatus = this.getFieldVisibilityStatus(
      fieldData.hidden
    );
    fieldData.hidden
      ? fieldData.formControl.disable()
      : fieldData.formControl.enable();
  }

  private getFieldVisibilityStatus(hidden: boolean): FieldVisibilityStatus {
    return hidden
      ? FieldVisibilityStatus.HIDDEN
      : FieldVisibilityStatus.VISIBLE;
  }
}
