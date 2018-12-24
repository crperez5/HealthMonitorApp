import { browser, by, element } from 'protractor';

beforeEach(function () {
  browser.ignoreSynchronization = true;
});
afterEach(function () {
  browser.ignoreSynchronization = false;
});

describe('workspace-project App', function() {
  it('should display welcome message', async function() {
    await browser.get('/');
    let pagecontent =  await browser.getPageSource();
    console.info(pagecontent)
    let text = await element(by.css('app-root h1')).getText();
    expect(text).toEqual('ILO Status in Localhost');
  });
});
