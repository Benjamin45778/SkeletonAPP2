import { browser, by, element } from 'protractor';

describe('Aplicación Ruta de Hoy - E2E', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('debería cargar la página principal', async () => {
    const title = await browser.getTitle();
    expect(title).toBeDefined();
  });

  it('debería encontrar al menos un elemento ion-content', async () => {
    const content = element(by.css('ion-content'));
    expect(await content.isPresent()).toBe(true);
  });

});
