import { browser, by, element } from 'protractor';

describe('Ruta de Hoy - E2E Smoke', () => {
  beforeAll(async () => {
    await browser.get('/');
  });

  it('debería cargar la app (ion-app presente)', async () => {
    const exists = await element(by.css('ion-app')).isPresent();
    expect(exists).toBeTrue();
  });

  it('debería tener contenido visible (ion-content presente)', async () => {
    const exists = await element(by.css('ion-content')).isPresent();
    expect(exists).toBeTrue();
  });
});
