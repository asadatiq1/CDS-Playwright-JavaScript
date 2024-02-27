import { test, beforeEach } from "@playwright/test";
import data from "../CommonData/Data.json";
import { utils } from "../CommonUtility/utils";
import loginData from "../Elements/Login.json";
import dashData from "../Elements/Dashboard.json";

let comon;

beforeEach(async ({ page }) => {
  comon = new utils(page);
  await comon.visit(data.baseUrl);
});

test("Verify UI", async ({ page }) => {
  await comon.visibility(loginData.emailField);
  await comon.visibility(loginData.passwordField);
  await comon.visibility(loginData.CTA_forgot);
  await comon.visibility(loginData.lginBtn);
});

test("Verify user can login with registered email", async ({ page }) => {
  await comon.enter(loginData.emailField, data.RegisteredEmail);
  await comon.enter(loginData.passwordField, data.RegisteredPassword);
  await comon.click(loginData.lginBtn);
  await comon.text(dashData.header, dashData.headerText);
});
