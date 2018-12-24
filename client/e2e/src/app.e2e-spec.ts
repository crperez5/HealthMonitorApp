import { browser, by, element } from 'protractor';
var originalTimeout;
beforeEach(function() {
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;
});
afterEach(function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

describe('workspace-project App', function() {
  it('should display welcome message', async function() {
    await browser.get('/');
    let text = await element(by.css('app-root h1')).getText();
    expect(text).toEqual('ILO Status in Localhost');
  });
});
