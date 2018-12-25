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
    let text = await element(by.css('button')).getText();
    expect(text).toEqual('Production');
  });
});
