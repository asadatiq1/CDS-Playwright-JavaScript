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

test("Verify login with unregistered email", async ({ page }) => {
  await comon.enter(loginData.emailField, data.UnregisteredEmail);
  await comon.enter(loginData.passwordField, data.WrongPassword);
  await comon.click(loginData.lginBtn);
  await comon.text(
    loginData.UnregisteredError,
    loginData.UnregisteredErrorText
  );
});

test("Veify click login button without entering email and a password", async ({
  page,
}) => {
  await comon.click(loginData.lginBtn);
  await comon.text(
    loginData.RequiredEmailError,
    loginData.RequiredEmailErrorText
  );
  await comon.text(
    loginData.RequiredPasswordError,
    loginData.RequiredPasswordErrorText
  );
});

test("Verify click login without entering email", async ({ page }) => {
  await comon.enter(loginData.passwordField, data.RegisteredPassword);
  await comon.click(loginData.lginBtn);
  await comon.text(
    loginData.RequiredEmailError,
    loginData.RequiredEmailErrorText
  );
});

test("Verify click login without entering password", async ({ page }) => {
  await comon.enter(loginData.emailField, data.RegisteredEmail);
  await comon.click(loginData.lginBtn);
  await comon.text(
    loginData.RequiredPasswordError,
    loginData.RequiredPasswordErrorText
  );
});

test("Verify enter invalid email", async ({ page }) => {
  await comon.enter(loginData.emailField, data.InvalidEmail);
  await comon.enter(loginData.passwordField, data.RegisteredPassword);
  await comon.click(loginData.lginBtn);
  await comon.text(
    loginData.InvalidEmailError,
    loginData.InvalidEmailErrorText
  );
});

test("Verify enter invalid password", async ({ page }) => {
  await comon.enter(loginData.emailField, data.RegisteredEmail);
  await comon.enter(loginData.passwordField, data.InvalidEmail);
  await comon.click(loginData.lginBtn);
  await comon.text(
    loginData.InvalidEmailError,
    loginData.InvalidEmailErrorText
  );
});

test("Enter wrong password for register email", async ({ page }) => {
  await comon.enter(loginData.emailField, data.RegisteredEmail);
  await comon.enter(loginData.passwordField, data.WrongPassword);
  await comon.click(loginData.lginBtn);
  await comon.text(
    loginData.WrongEmailPasswordError,
    loginData.WrongEmailPasswordErrorText
  );
});
