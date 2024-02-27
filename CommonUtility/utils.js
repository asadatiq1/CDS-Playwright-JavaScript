const { expect } = require("@playwright/test");

exports.utils = class utils {
  constructor(page) {
    this.page = page;
  }

  async visit(element) {
    await this.page.goto(element);
  }

  async wait(selector) {
    const val = await this.page.locator(selector).isVisible();
    if (!val) {
      await this.page.waitForTimeout(5000);
    } else return;
  }

  async visibility(element) {
    await this.wait(element);
    return await this.page.locator(element).isVisible();
  }

  async text(element, text) {
    await this.wait(element);
    const actualText = await this.page.locator(element).innerText();
    expect(actualText).toEqual(expect.stringContaining(text));
  }

  async click(element) {
    await this.wait(element);
    await this.page.locator(element).click();
  }

  async enter(element, text) {
    await this.wait(element);
    await this.page.locator(element).fill(text);
  }
};
