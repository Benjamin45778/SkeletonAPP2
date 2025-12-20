import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CertificacionesComponent } from './certificaciones.component';

describe('CertificacionesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CertificacionesComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CertificacionesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
