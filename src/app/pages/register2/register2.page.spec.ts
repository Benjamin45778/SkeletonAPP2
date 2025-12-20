import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Register2Page } from './register2.page';
import { AuthService } from '../../services/auth.service';

describe('Register2Page', () => {
  const storageMock = {
    create: async () => storageMock,
    get: async () => null,
    set: async () => true,
    remove: async () => true,
    clear: async () => true
  };

  const authMock = {
    register: async () => true,
    login: async () => true,
    getEmail: () => ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), Register2Page],
      providers: [
        { provide: Storage, useValue: storageMock },
        { provide: AuthService, useValue: authMock }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Register2Page);
    const page = fixture.componentInstance;
    expect(page).toBeTruthy();
  });
});
