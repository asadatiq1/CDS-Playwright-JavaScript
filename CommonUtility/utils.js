const { expect } = require("@playwright/test");

exports.utils = class utils {
  constructor(page) {
    this.page = page;
  }

  async visit(element) {
    await this.page.goto(element);
  }

  async wait(element) {
    const val = await this.page.locator(element).isVisible();
    if (!val) {
      await this.page.waitForTimeout(5000);
    } else return;
  }

  async visibility(element) {
    return await this.page.locator(element).isVisible();
  }

  async text(element, text) {
    const actualText = await this.page.locator(element).innerText();
    expect(actualText).toEqual(expect.stringContaining(text));
  }

  async enter(element, text) {
    await this.page.locator(element).fill(text);
  }
};
