import { AetherNewsPage } from './app.po';

describe('aether-news App', () => {
  let page: AetherNewsPage;

  beforeEach(() => {
    page = new AetherNewsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
