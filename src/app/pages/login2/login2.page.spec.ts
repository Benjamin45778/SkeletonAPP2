import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login2Page } from './login2.page';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('Login2Page', () => {
  let component: Login2Page;
  let fixture: ComponentFixture<Login2Page>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', [
      'login',
    ]);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [Login2Page],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar error si faltan email o contraseña', async () => {
    component.email = '';
    component.password = '';

    await component.onSubmit();

    expect(component.errorMsg).toBe('Debes ingresar correo y contraseña.');
    expect(authServiceMock.login).not.toHaveBeenCalled();
  });

  it('debería llamar a AuthService.login y navegar cuando el login es exitoso', async () => {
    component.email = 'test@example.com';
    component.password = '123456';

    authServiceMock.login.and.returnValue(Promise.resolve(true));

    await component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith(
      'test@example.com',
      '123456'
    );
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/home2', {
      replaceUrl: true,
    });
    expect(component.errorMsg).toBe('');
  });

  it('debería mostrar error cuando el login falla', async () => {
    component.email = 'test@example.com';
    component.password = 'badpass';

    authServiceMock.login.and.returnValue(Promise.resolve(false));

    await component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalled();
    expect(component.errorMsg).toBe('Correo o contraseña incorrectos.');
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });
});
