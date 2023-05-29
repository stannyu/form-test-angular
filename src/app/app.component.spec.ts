import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FieldsFormModule } from './fields-form/fields-form.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldsFormModule],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a FieldsFormComponent', () => {
    const fieldsFormComponentElement = fixture.debugElement.query(
      By.css('app-fields-form')
    );
    expect(fieldsFormComponentElement).toBeTruthy();
  });

  it('should have a valid fieldList', () => {
    expect(Array.isArray(component.fieldList)).toBe(true);
  });
});
