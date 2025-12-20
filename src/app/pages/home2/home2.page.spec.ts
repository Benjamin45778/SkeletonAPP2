import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Home2Page } from './home2.page';
import { AuthService } from '../../services/auth.service';

describe('Home2Page', () => {
  const storageMock = {
    create: async () => storageMock,
    get: async () => null,
    set: async () => true,
    remove: async () => true,
    clear: async () => true
  };

  const authMock = {
    getEmail: () => '',
    logout: async () => true,
    isLoggedIn: async () => true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), Home2Page],
      providers: [
        { provide: Storage, useValue: storageMock },
        { provide: AuthService, useValue: authMock }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Home2Page);
    const page = fixture.componentInstance;
    expect(page).toBeTruthy();
  });
});
