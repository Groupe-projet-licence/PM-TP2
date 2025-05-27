import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['register', 'setToken']);
    const navSpy = jasmine.createSpyObj('NavController', ['navigateRoot']);

    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [IonicModule.forRoot(), FormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: NavController, useValue: navSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    navCtrlSpy = TestBed.inject(NavController) as jasmine.SpyObj<NavController>;
    fixture.detectChanges();
  });

  it('devrait créer la page', () => {
    expect(component).toBeTruthy();
  });

  it('devrait appeler authService.register et naviguer après succès', () => {
    const fakeToken = '123abc';
    authServiceSpy.register.and.returnValue(of({ token: fakeToken }));

    component.form = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
      password_confirmation: 'password'
    };

    component.register();

    expect(authServiceSpy.register).toHaveBeenCalledWith(component.form);
    expect(authServiceSpy.setToken).toHaveBeenCalledWith(fakeToken);
    expect(navCtrlSpy.navigateRoot).toHaveBeenCalledWith('/home');
  });

  it('devrait afficher une alerte en cas d’erreur', () => {
    spyOn(window, 'alert');
    const errorResponse = {
      error: { message: 'Erreur serveur' }
    };
    authServiceSpy.register.and.returnValue(throwError(errorResponse));

    component.register();

    expect(window.alert).toHaveBeenCalledWith('Erreur: Erreur serveur');
  });
});
