import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  it('should display welcome message', async () => {
    await browser.get('/');
    console.info('navigated to main')
    await browser.wait(async () => {}, 5000);
    let text = await element(by.css('app-root h1')).getText();
    expect(text).toEqual('ILO Status in Localhost');
  });
});



 

