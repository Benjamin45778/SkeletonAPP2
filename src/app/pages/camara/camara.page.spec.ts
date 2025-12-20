import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { CamaraPage } from './camara.page';

describe('CamaraPage', () => {
  const storageMock = {
    create: async () => storageMock,
    get: async () => null,
    set: async () => true,
    remove: async () => true,
    clear: async () => true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CamaraPage],
      providers: [{ provide: Storage, useValue: storageMock }]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CamaraPage);
    const page = fixture.componentInstance;
    expect(page).toBeTruthy();
  });
});
