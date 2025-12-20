import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExperienciaComponent } from './experiencia.component';

describe('ExperienciaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ExperienciaComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ExperienciaComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
