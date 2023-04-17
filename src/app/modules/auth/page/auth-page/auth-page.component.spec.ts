import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { AuthPageComponent } from './auth-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [ AuthPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // PATRON AAA (Arrange Act Assert)
  it('Retorno de formulario invalido', () => {
    const mockCredentials = {email: 'abc.ec', password: '1234567891011121314151617181920'}

    const emailForm: any = component.formLogin.get('email')
    const passwordForm: any = component.formLogin.get('password')

    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)

    expect(component.formLogin.invalid).toEqual(true);
  });

  it('Retorno de formulario valido', () => {
    const mockCredentials = {email: 'test@test.com', password: '12345678'}

    const emailForm: any = component.formLogin.get('email')
    const passwordForm: any = component.formLogin.get('password')

    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)

    expect(component.formLogin.invalid).toEqual(false);
  });

  it('Verificar boton de Iniciar Session', () => {
    const elementRef = fixture.debugElement.query(By.css('.form-action button'))
    const getInnerText = elementRef.nativeElement.innerText

    expect(getInnerText).toEqual('Iniciar Sesión');
  });
});
