import { utils } from "../CommonUtility/utils";

exports.loginMethod = class loginMethod {
  constructor(page) {
    this.page = page;
    this.utils = new utils();
  }
};
