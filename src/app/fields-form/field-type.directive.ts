import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[fieldTypeTemplate]',
})
export class FieldDirective {
  @Input('fieldTypeTemplate') name!: string;

  constructor(readonly template: TemplateRef<any>) {}
}
